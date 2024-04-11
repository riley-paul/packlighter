import db from "@/db/drizzle";
import { privateProcedure, publicProcedure, router } from "../trpc";
import {
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listsTable,
} from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const listRouter = router({
  get: privateProcedure.query(async () => {
    const lists = await db
      .select()
      .from(listsTable)
      .orderBy(listsTable.sortOrder);
    return lists;
  }),
  getById: privateProcedure.input(z.string()).query(async ({ input }) => {
    const list = await db.query.listsTable.findFirst({
      where: eq(listsTable.id, input),
    });

    if (!list) {
      throw new TRPCError({ code: "NOT_FOUND", message: "List not found" });
    }

    const categories = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.list, input));

    const categoryItems = await db
      .select()
      .from(categoriesItemsTable)
      .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id));

    const expandedCategories = categories.map((category) => {
      const items = categoryItems
        .filter((ci) => ci.categories_items.category === category.id)
        .filter((ci) => ci.items !== null)
        .map((ci) => ({ ...ci.categories_items, itemData: ci.items! }));

      return { ...category, items };
    });

    return { ...list, categories: expandedCategories };
  }),
});

export default listRouter;
