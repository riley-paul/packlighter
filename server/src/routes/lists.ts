import {
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listInsertSchema,
  listsTable,
  type ExpandedCategory,
  type ExpandedList,
} from "@/db/schema";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import authMiddleware from "../helpers/auth-middleware.ts";
import { db } from "@/db";
import { zValidator } from "@hono/zod-validator";
import { validIdSchema } from "../lib/validators.ts";

const idAndUserIdFilter = (props: { userId: string; id: string }) =>
  and(eq(listsTable.id, props.id), eq(listsTable.userId, props.userId));

const app = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const lists = await db
      .select()
      .from(listsTable)
      .where(eq(listsTable.userId, userId))
      .orderBy(listsTable.sortOrder);
    return c.json(lists);
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: validIdSchema(listsTable) })),
    async (c) => {
      const { id } = c.req.valid("param");
      const userId = c.get("user").id;

      const list = await db
        .select()
        .from(listsTable)
        .where(eq(listsTable.id, id))
        .then((rows) => rows[0]);

      const categories = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.list, id));

      const categoryItems = await db
        .select()
        .from(categoriesItemsTable)
        .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id))
        .where(eq(itemsTable.userId, userId));

      const expandedCategories: ExpandedCategory[] = categories.map(
        (category) => {
          const items = categoryItems
            .filter((ci) => ci.categories_items.category === category.id)
            .filter((ci) => ci.items !== null)
            .map((ci) => ({ ...ci.categories_items, itemData: ci.items! }));
          return { ...category, items };
        },
      );

      const result: ExpandedList = { ...list, categories: expandedCategories };
      return c.json(result);
    },
  )
  .post(
    "/delete",
    zValidator("json", z.object({ id: validIdSchema(listsTable) })),
    async (c) => {
      const userId = c.get("user").id;
      const { id } = c.req.valid("json");
      const deleted = await db
        .delete(listsTable)
        .where(idAndUserIdFilter({ userId, id }))
        .returning()
        .then((rows) => rows[0]);
      return c.json(deleted);
    },
  )
  .post("/", async (c) => {
    const userId = c.get("user").id;
    const currentSortOrders = await db
      .select({ value: listsTable.sortOrder })
      .from(listsTable)
      .where(eq(listsTable.userId, userId));
    const maxSortOrder = Math.max(...currentSortOrders.map((r) => r.value));
    const newSortOrder = maxSortOrder + 1;

    const newList = await db
      .insert(listsTable)
      .values({ userId, sortOrder: newSortOrder })
      .returning()
      .then((rows) => rows[0]);
    return c.json(newList);
  })
  .post(
    "/update",
    zValidator(
      "json",
      z.object({
        id: validIdSchema(listsTable),
        value: listInsertSchema.partial(),
      }),
    ),
    async (c) => {
      const userId = c.get("user").id;
      const { id, value } = c.req.valid("json");
      const updated = await db
        .update(listsTable)
        .set(value)
        .where(idAndUserIdFilter({ userId, id }))
        .returning()
        .then((rows) => rows[0]);
      return c.json(updated);
    },
  )
  .post("/reorder", zValidator("json", z.array(z.string())), async (c) => {
    const userId = c.get("user").id;
    const ids = c.req.valid("json");
    await Promise.all(
      ids.map((id, idx) =>
        db
          .update(listsTable)
          .set({ sortOrder: idx + 1 })
          .where(idAndUserIdFilter({ userId, id })),
      ),
    );
    return c.json(ids);
  })
  .post(
    "/unpack",
    zValidator("json", z.object({ id: validIdSchema(listsTable) })),
    async (c) => {
      const { id } = c.req.valid("json");
      const categoryItems = await db
        .select({ id: categoriesItemsTable.id })
        .from(categoriesItemsTable)
        .leftJoin(
          categoriesTable,
          eq(categoriesTable.id, categoriesItemsTable.category),
        )
        .where(eq(categoriesTable.list, id));

      const ids = categoryItems.filter((i) => i !== null).map((ci) => ci.id!);

      await db
        .update(categoriesItemsTable)
        .set({ packed: false })
        .where(inArray(categoriesItemsTable.id, ids));
    },
  );

export default app;
