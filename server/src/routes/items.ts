import { itemInsertSchema, itemsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { Hono } from "hono";
import authMiddleware from "../helpers/auth-middleware.ts";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db";
import { validIdSchema } from "../lib/validators.ts";

const idAndUserIdFilter = (props: { userId: string; id: string }) =>
  and(eq(itemsTable.id, props.id), eq(itemsTable.userId, props.userId));

const app = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const items = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.userId, userId));
    return c.json(items);
  })
  .post(
    "/delete",
    zValidator("json", z.object({ id: validIdSchema(itemsTable) })),
    async (c) => {
      const userId = c.get("user").id;
      const { id } = c.req.valid("json");
      const deleted = await db
        .delete(itemsTable)
        .where(idAndUserIdFilter({ userId, id }))
        .returning()
        .then((rows) => rows[0]);
      return c.json(deleted);
    },
  )
  .post(
    "/update",
    zValidator(
      "json",
      z.object({
        id: validIdSchema(itemsTable),
        value: itemInsertSchema.partial(),
      }),
    ),
    async (c) => {
      const userId = c.get("user").id;
      const { id, value } = c.req.valid("json");
      const updated = await db
        .update(itemsTable)
        .set(value)
        .where(idAndUserIdFilter({ userId, id }))
        .returning()
        .then((rows) => rows[0]);
      return c.json(updated);
    },
  );

export default app;
