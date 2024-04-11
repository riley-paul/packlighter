import db from "@/db/drizzle";
import { privateProcedure, router } from "../trpc";
import { itemsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const itemsRouter = router({
  get: privateProcedure.query(async ({ ctx: { userId } }) => {
    const items = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.user, userId));
    return items;
  }),
  delete: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { userId } }) => {
      const deleted = await db
        .delete(itemsTable)
        .where(and(eq(itemsTable.user, userId), eq(itemsTable.id, input)))
        .returning();
      return deleted[0];
    }),
});

export default itemsRouter;
