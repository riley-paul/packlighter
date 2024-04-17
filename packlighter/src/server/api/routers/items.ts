import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { itemSchema, items } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const itemsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const results = await ctx.db
      .select()
      .from(items)
      .where(eq(items.userId, userId));
    return results;
  }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const deleted = await ctx.db
        .delete(items)
        .where(and(eq(items.userId, userId), eq(items.id, input)))
        .returning();
      return deleted[0];
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), value: itemSchema.partial() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const updated = await ctx.db
        .update(items)
        .set(input.value)
        .where(and(eq(items.userId, userId), eq(items.id, input.id)))
        .returning();
      return updated[0];
    }),
});

export default itemsRouter;
