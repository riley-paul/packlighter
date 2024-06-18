import { db } from "@/db";
import {
  categoriesItemsTable,
  categoriesTable,
  categoryItemSchema,
  itemsTable,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import authMiddleware from "../helpers/auth-middleware.ts";
import { validIdSchema } from "@/lib/validators.ts";
import { zValidator } from "@hono/zod-validator";

const idAndUserIdFilter = (props: { userId: string; id: string }) =>
  and(
    eq(categoriesItemsTable.id, props.id),
    eq(categoriesItemsTable.userId, props.userId),
  );

const app = new Hono()
  .use(authMiddleware)
  .post(
    "/",
    zValidator(
      "json",
      z.object({ categoryId: validIdSchema(categoriesTable) }),
    ),
    async (c) => {
      const { categoryId } = c.req.valid("json");
      const userId = c.get("user").id;
      const createdItem = await db
        .insert(itemsTable)
        .values({ userId })
        .returning()
        .then((rows) => rows[0]);

      const created = await db
        .insert(categoriesItemsTable)
        .values({ userId, category: categoryId, item: createdItem.id })
        .returning()
        .then((rows) => rows[0]);

      return c.json(created);
    },
  )
  .post(
    "/toggle-packed",
    zValidator(
      "json",
      z.object({
        id: validIdSchema(categoriesItemsTable),
        value: z.boolean().optional(),
      }),
    ),
    async (c) => {
      const { id, value } = c.req.valid("json");
      const item = await db
        .select()
        .from(categoriesItemsTable)
        .where(eq(categoriesItemsTable.id, id));
      const isPacked = item[0].packed;

      const updated = await db
        .update(categoriesItemsTable)
        .set({ packed: value ?? !isPacked })
        .where(eq(categoriesItemsTable.id, id))
        .returning()
        .then((rows) => rows[0]);
      return c.json(updated);
    },
  )
  .post(
    "/delete",
    zValidator("json", z.object({ id: validIdSchema(categoriesItemsTable) })),
    async (c) => {
      const userId = c.get("user").id;
      const { id } = c.req.valid("json");
      const deleted = await db
        .delete(categoriesItemsTable)
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
        id: validIdSchema(categoriesItemsTable),
        value: categoryItemSchema.partial(),
      }),
    ),
    async (c) => {
      const userId = c.get("user").id;
      const { id, value } = c.req.valid("json");
      const updated = await db
        .update(categoriesItemsTable)
        .set(value)
        .where(idAndUserIdFilter({ userId, id }))
        .returning()
        .then((rows) => rows[0]);
      return c.json(updated);
    },
  );

export default app;
