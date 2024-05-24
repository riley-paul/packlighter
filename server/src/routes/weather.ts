import { Hono } from "hono";
import { DateTime } from "luxon";
import { db } from "../db";
import { settingsTable, stationsTable, summariesTable } from "../db/schema";
import { eq } from "drizzle-orm";
import fetchWeatherData from "../helpers/fetch-weather-data";
import summarizeStations from "../helpers/summarize-stations";
import type { SummarizedWeather, WeatherFetch } from "@/api/lib/types";
import authMiddleware from "../middleware/auth";

const getFreshWeatherSummary = async (
  userId: string,
  dateString: string,
): Promise<SummarizedWeather> => {
  console.log("fetching new data from weather underground");

  // const date = DateTime.fromISO(dateString, {
  //   zone: settings.timeZone,
  // });
  
  const date = DateTime.fromISO(dateString);
  if (date.invalidReason) throw new Error("Invalid date");

  const stations = await db
    .select()
    .from(stationsTable)
    .where(eq(stationsTable.userId, userId));

  const settings = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.userId, userId))
    .then((rows) => rows[0]);

  const responses = await Promise.all(
    stations.map((station) =>
      fetchWeatherData(station, date, settings.wuApiKey),
    ),
  );
  const summary = summarizeStations(responses, date, settings.timesOfInterest);

  await db.insert(summariesTable).values({
    userId,
    date: dateString,
    responses,
    summary,
  });

  return summary;
};

const app = new Hono()
  .use(authMiddleware)
  .get("/:date", async (c) => {
    const userId = c.get("user").id;
    const dateString = c.req.param("date");

    const summaries = await db
      .select()
      .from(summariesTable)
      .where(eq(summariesTable.date, dateString));

    if (summaries.length >= 1) {
      return c.json(summaries[0].summary);
    }

    const summary = await getFreshWeatherSummary(userId, dateString);
    return c.json(summary);
  })
  .get("/:date/fresh", async (c) => {
    const userId = c.get("user").id;
    const dateString = c.req.param("date");
    const summary = await getFreshWeatherSummary(userId, dateString);
    return c.json(summary);
  });

export default app;
