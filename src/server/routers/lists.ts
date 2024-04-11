import db from "@/db/drizzle";
import { publicProcedure, router } from "../trpc";
import { listsTable } from "@/db/schema";

const listRouter = router({
  get: publicProcedure.query(async () => {
    const lists = await db
      .select()
      .from(listsTable)
      .orderBy(listsTable.sortOrder);
    return lists;
  }),
});

export default listRouter