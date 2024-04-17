import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  categories,
  categoriesItems,
  categorySchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const categoriesRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const deleted = await ctx.db
        .delete(categories)
        .where(eq(categories.id, input))
        .returning();
      return deleted[0];
    }),
  create: protectedProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const created = await ctx.db
        .insert(categories)
        .values({ listId: input.listId })
        .returning();
      return created[0];
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), value: categorySchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const updated = await ctx.db
        .update(categories)
        .set(input.value)
        .where(eq(categories.id, input.id))
        .returning();
      return updated[0];
    }),
  reorder: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input, ctx }) => {
      await Promise.all(
        input.map((id, idx) =>
          ctx.db
            .update(categories)
            .set({ sortOrder: idx + 1 })
            .where(eq(categories.id, id)),
        ),
      );
    }),
  togglePacked: protectedProcedure
    .input(z.object({ id: z.string(), value: z.boolean().optional() }))
    .mutation(async ({ input, ctx }) => {
      const categoryItems = await ctx.db
        .select()
        .from(categoriesItems)
        .where(eq(categoriesItems.categoryId, input.id));

      const fullyPacked = categoryItems.every((item) => item.packed);
      const newValue = input.value ?? !fullyPacked;

      await ctx.db
        .update(categoriesItems)
        .set({ packed: newValue })
        .where(eq(categoriesItems.categoryId, input.id));
    }),
});

export default categoriesRouter;
