import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { categoriesItems, categoryItemSchema, items } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

import { eq } from "drizzle-orm";
import { z } from "zod";

const categoriesItemsRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const deleted = await ctx.db
        .delete(categoriesItems)
        .where(eq(categoriesItems.id, input))
        .returning();
      return deleted[0];
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), value: categoryItemSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const updated = await ctx.db
        .update(categoriesItems)
        .set(input.value)
        .where(eq(categoriesItems.id, input.id))
        .returning();
      return updated[0];
    }),
  createEmpty: protectedProcedure
    .input(z.object({ categoryId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { categoryId } = input;

      const createdItem = await ctx.db
        .insert(items)
        .values({ userId })
        .returning();

      if (!createdItem[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create item",
        });
      }

      const created = await ctx.db
        .insert(categoriesItems)
        .values({ categoryId, itemId: createdItem[0].id })
        .returning();

      return created[0];
    }),
  togglePacked: protectedProcedure
    .input(z.object({ value: z.boolean().optional(), id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.db
        .select()
        .from(categoriesItems)
        .where(eq(categoriesItems.id, input.id));

      if (!item[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }

      const isPacked = item[0].packed;

      const updated = await ctx.db
        .update(categoriesItems)
        .set({ packed: input.value ?? !isPacked })
        .where(eq(categoriesItems.id, input.id))
        .returning();

      return updated[0];
    }),
});

export default categoriesItemsRouter;
