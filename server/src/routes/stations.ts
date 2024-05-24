import { Hono } from "hono";
import { db } from "../db";
import { stationInsertSchema, stationsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import authMiddleware from "../middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const paramValidator = zValidator("param", z.object({ id: z.string() }));
const queryValidator = zValidator("query", z.object({ redirect: z.string() }));
const formValidator = zValidator(
  "form",
  stationInsertSchema.omit({ userId: true }).extend({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
  }),
);

const app = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const stations = await db
      .select()
      .from(stationsTable)
      .where(eq(stationsTable.userId, userId));
    return c.json(stations);
  })
  .post("/", formValidator, queryValidator, async (c) => {
    const userId = c.get("user").id;
    const data = c.req.valid("form");
    const { redirect } = c.req.valid("query");
    await db.insert(stationsTable).values({ ...data, userId });
    return c.redirect(redirect);
  })
  .post(
    "/:id/update",
    formValidator,
    queryValidator,
    paramValidator,
    async (c) => {
      const userId = c.get("user").id;
      const data = c.req.valid("form");
      const { id } = c.req.valid("param");
      const { redirect } = c.req.valid("query");
      await db
        .update(stationsTable)
        .set(data)
        .where(and(eq(stationsTable.id, id), eq(stationsTable.userId, userId)));
      return c.redirect(redirect);
    },
  )
  .post("/:id/delete", paramValidator, queryValidator, async (c) => {
    const userId = c.get("user").id;
    const { id } = c.req.valid("param");
    const { redirect } = c.req.valid("query");
    await db
      .delete(stationsTable)
      .where(and(eq(stationsTable.id, id), eq(stationsTable.userId, userId)));
    return c.redirect(redirect);
  });

export default app;
