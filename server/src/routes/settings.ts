import { Hono } from "hono";
import { db } from "@/api/db";
import { settingInsertSchema, settingsTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import type { TimesOfInterest } from "@/api/lib/types";
import authMiddleware from "../middleware/auth";
import { z } from "zod";

const queryValidator = zValidator("query", z.object({ redirect: z.string() }));
const formValidator = zValidator(
  "form",
  settingInsertSchema.omit({ userId: true }).extend({
    emailTime: z.coerce.string(),
    timesOfInterest: z.string(),
  }),
);

const app = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const settings = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, userId))
      .then((rows) => rows[0]);
    if (!settings) {
      return c.json(null);
    }
    return c.json(settings);
  })
  .post("/", formValidator, queryValidator, async (c) => {
    const userId = c.get("user").id;
    const data = c.req.valid("form");
    const { redirect } = c.req.valid("query");
    await db
      .update(settingsTable)
      .set({
        ...data,
        emailTime: JSON.parse(data.emailTime),
        timesOfInterest: JSON.parse(data.timesOfInterest) as TimesOfInterest,
      })
      .where(eq(settingsTable.userId, userId));
    return c.redirect(redirect);
  });

export default app;
