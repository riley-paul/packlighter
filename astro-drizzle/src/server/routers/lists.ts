import db from "@/db/drizzle";
import { privateProcedure, router } from "../trpc";
import {
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listSchema,
  listsTable,
  type ExpandedCategory,
  type ExpandedList,
} from "@/db/schema";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const listRouter = router({
  get: privateProcedure.query(async () => {
    const lists = await db
      .select()
      .from(listsTable)
      .orderBy(listsTable.sortOrder);
    return lists;
  }),
  getById: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx: { userId } }) => {
      const list = await db.query.listsTable.findFirst({
        where: eq(listsTable.id, input),
      });

      if (!list) {
        throw new TRPCError({ code: "NOT_FOUND", message: "List not found" });
      }

      if (list.user !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this list",
        });
      }

      const categories = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.list, input));

      const categoryItems = await db
        .select()
        .from(categoriesItemsTable)
        .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id))
        .where(eq(itemsTable.user, userId));

      const expandedCategories: ExpandedCategory[] = categories.map(
        (category) => {
          const items = categoryItems
            .filter((ci) => ci.categories_items.category === category.id)
            .filter((ci) => ci.items !== null)
            .map((ci) => ({ ...ci.categories_items, itemData: ci.items! }));

          return { ...category, items };
        }
      );

      const result: ExpandedList = { ...list, categories: expandedCategories };
      return result;
    }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { userId } }) => {
      const deleted = await db
        .delete(listsTable)
        .where(and(eq(listsTable.user, userId), eq(listsTable.id, input)))
        .returning();
      return deleted[0];
    }),
  create: privateProcedure.mutation(async ({ ctx: { userId } }) => {
    const currentSortOrders = await db
      .select({ value: listsTable.sortOrder })
      .from(listsTable)
      .where(eq(listsTable.user, userId));
    const maxSortOrder = Math.max(...currentSortOrders.map((r) => r.value));
    const newSortOrder = maxSortOrder + 1;

    const newList = await db
      .insert(listsTable)
      .values({ user: userId, sortOrder: newSortOrder })
      .returning();
    return newList[0];
  }),
  update: privateProcedure
    .input(z.object({ id: z.string(), value: listSchema.partial() }))
    .mutation(async ({ input }) => {
      const updated = await db
        .update(listsTable)
        .set(input.value)
        .where(eq(listsTable.id, input.id))
        .returning();
      return updated[0];
    }),
  reorder: privateProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      await Promise.all(
        input.map((id, idx) =>
          db
            .update(listsTable)
            .set({ sortOrder: idx + 1 })
            .where(eq(listsTable.id, id))
        )
      );
    }),
  unpack: privateProcedure.input(z.string()).mutation(async ({ input }) => {
    const categoryItems = await db
      .select({ id: categoriesItemsTable.id })
      .from(categoriesItemsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesTable.id, categoriesItemsTable.category)
      )
      .where(eq(categoriesTable.list, input));

    const ids = categoryItems.filter((i) => i !== null).map((ci) => ci.id!);

    await db
      .update(categoriesItemsTable)
      .set({ packed: false })
      .where(inArray(categoriesItemsTable.id, ids));
  }),
  duplicate: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { userId } }) => {
      // const currentSortOrders = await db
      //   .select({ value: listsTable.sortOrder })
      //   .from(listsTable)
      //   .where(eq(listsTable.user, userId));
      // const maxSortOrder = Math.max(...currentSortOrders.map((r) => r.value));
      // const newSortOrder = maxSortOrder + 1;

      const currentListQuery = await db
        .select()
        .from(listsTable)
        .where(eq(listsTable.id, input));
      const currentList = currentListQuery[0];

      if (!currentList) {
        throw new TRPCError({ code: "NOT_FOUND", message: "List not found" });
      }

      if (currentList.user !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this list",
        });
      }

      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message: "Not implemented",
      });

      // const currentCategories = await db
      //   .select({

      //   })
      //   .from(categoriesTable)
      //   .groupBy(categoriesTable.id);

      // console.log(currentCategories);

      // const newList = await db
      //   .insert(listsTable)
      //   .values({
      //     user: userId,
      //     name: `${currentList.name} (Copy)`,
      //     sortOrder: newSortOrder,
      //     description: currentList.description,
      //   })
      //   .returning();

      // const newCategories = await Promise.all(
      //   currentCategoriesItems.map(async (ci) => {
      //     const newCategory = await db
      //       .insert(categoriesTable)
      //       .values({ list: newList[0].id, name: ci.categories.name })
      //       .returning();
      //     return newCategory[0];
      //   })
      // );
    }),
});

export default listRouter;
