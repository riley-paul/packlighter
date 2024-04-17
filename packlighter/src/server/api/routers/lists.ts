import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  type ExpandedCategory,
  type ExpandedList,
  categories,
  categoriesItems,
  items,
  listSchema,
  lists,
} from "@/server/db/schema";

const listRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const results = await ctx.db
      .select()
      .from(lists)
      .where(eq(lists.userId, userId))
      .orderBy(lists.sortOrder);
    return results;
  }),
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const list = await ctx.db.query.lists.findFirst({
        where: eq(lists.id, input),
      });

      if (!list) {
        throw new TRPCError({ code: "NOT_FOUND", message: "List not found" });
      }

      if (list.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this list",
        });
      }

      const listCategories = await ctx.db
        .select()
        .from(categories)
        .where(eq(categories.listId, input));

      const listCategoryItems = await ctx.db
        .select()
        .from(categoriesItems)
        .leftJoin(items, eq(categoriesItems.itemId, items.id))
        .where(eq(items.userId, userId));

      const expandedCategories: ExpandedCategory[] = listCategories.map(
        (category) => {
          const items = listCategoryItems
            .filter((ci) => ci.category_item.categoryId === category.id)
            .filter((ci) => ci.item !== null)
            .map((ci) => ({ ...ci.category_item, itemData: ci.item! }));

          return { ...category, items };
        },
      );

      const result: ExpandedList = { ...list, categories: expandedCategories };
      return result;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const deleted = await ctx.db
        .delete(lists)
        .where(and(eq(lists.userId, userId), eq(lists.id, input)))
        .returning();
      return deleted[0];
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const currentSortOrders = await ctx.db
      .select({ value: lists.sortOrder })
      .from(lists)
      .where(eq(lists.userId, userId));
    const maxSortOrder = Math.max(...currentSortOrders.map((r) => r.value));
    const newSortOrder = maxSortOrder + 1;

    const newLists = await ctx.db
      .insert(lists)
      .values({ userId: userId, sortOrder: newSortOrder })
      .returning();

    const result = newLists[0];

    if (!result) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "List not created",
      });
    }

    return result;
  }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), value: listSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const updated = await ctx.db
        .update(lists)
        .set(input.value)
        .where(and(eq(lists.id, input.id), eq(lists.userId, userId)))
        .returning();
      return updated[0];
    }),
  reorder: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input, ctx }) => {
      await Promise.all(
        input.map((id, idx) =>
          ctx.db
            .update(lists)
            .set({ sortOrder: idx + 1 })
            .where(eq(lists.id, id)),
        ),
      );
    }),
  unpack: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const categoryItems = await ctx.db
        .select({ id: categoriesItems.id })
        .from(categoriesItems)
        .leftJoin(categories, eq(categories.id, categoriesItems.categoryId))
        .where(eq(categories.listId, input));

      const ids = categoryItems.filter((i) => i !== null).map((ci) => ci.id);

      await ctx.db
        .update(categoriesItems)
        .set({ packed: false })
        .where(inArray(categoriesItems.id, ids));
    }),
  duplicate: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      // const currentSortOrders = await db
      //   .select({ value: lists.sortOrder })
      //   .from(lists)
      //   .where(eq(lists.user, userId));
      // const maxSortOrder = Math.max(...currentSortOrders.map((r) => r.value));
      // const newSortOrder = maxSortOrder + 1;

      const currentListQuery = await ctx.db
        .select()
        .from(lists)
        .where(eq(lists.id, input));
      const currentList = currentListQuery[0];

      if (!currentList) {
        throw new TRPCError({ code: "NOT_FOUND", message: "List not found" });
      }

      if (currentList.userId !== userId) {
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
      //   .from(categories)
      //   .groupBy(categories.id);

      // console.log(currentCategories);

      // const newList = await db
      //   .insert(lists)
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
      //       .insert(categories)
      //       .values({ list: newList[0].id, name: ci.categories.name })
      //       .returning();
      //     return newCategory[0];
      //   })
      // );
    }),
});

export default listRouter;
