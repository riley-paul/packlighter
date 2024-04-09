import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import db from "../db/drizzle";
import {
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listsTable,
} from "../db/schema";
import { eq } from "drizzle-orm";

type Variables = {
  userId: string;
};

const app = new Hono<{ Variables: Variables }>()
  // .use(async (c, next) => {
  //   const auth = getAuth(c);

  //   if (!auth?.userId) {
  //     c.status(401);
  //     return c.text("Unauthorized");
  //   }

  //   c.set("userId", auth.userId);
  //   await next();
  // })
  .get("/", async (c) => {
    // const userId = c.get("userId");
    const lists = await db.select().from(listsTable);
    // .where(eq(listsTable.user, userId));
    return c.json(lists);
  })
  .post("/", (c) => c.text("create list"))
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const lists = await db
      .select()
      .from(listsTable)
      .where(eq(listsTable.id, id));

    const categories = await db
      .select()
      .from(categoriesItemsTable)
      .leftJoin(
        categoriesTable,
        eq(categoriesItemsTable.category, categoriesTable.id)
      )
      .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id));

    if (lists.length < 1) {
      c.status(404);
      return c.text("List not found");
    }

    return c.json({ ...lists[0], categories });
  })
  .put("/:id", (c) => c.text(`update list ${c.req.param("id")}`))
  .delete("/:id", (c) => c.text(`delete list ${c.req.param("id")}`));

export default app;
