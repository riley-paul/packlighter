import db from "@/db/drizzle";
import { privateProcedure, router } from "../trpc";
import { categoriesItemsTable, categoryItemSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const categoriesItemsRouter = router({
  delete: privateProcedure.input(z.string()).mutation(async ({ input }) => {
    const deleted = await db
      .delete(categoriesItemsTable)
      .where(eq(categoriesItemsTable.id, input))
      .returning();
    return deleted[0];
  }),
  update: privateProcedure
    .input(z.object({ id: z.string(), value: categoryItemSchema.partial() }))
    .mutation(async ({ input }) => {
      const updated = await db
        .update(categoriesItemsTable)
        .set(input.value)
        .where(eq(categoriesItemsTable.id, input.id))
        .returning();
      return updated[0];
    }),
  togglePacked: privateProcedure
    .input(z.object({ value: z.boolean().optional(), id: z.string() }))
    .mutation(async ({ input }) => {
      const item = await db
        .select()
        .from(categoriesItemsTable)
        .where(eq(categoriesItemsTable.id, input.id));
      const isPacked = item[0].packed;

      const updated = await db
        .update(categoriesItemsTable)
        .set({ packed: input.value ?? !isPacked })
        .where(eq(categoriesItemsTable.id, input.id))
        .returning();
      return updated[0];
    }),
});

export default categoriesItemsRouter;
