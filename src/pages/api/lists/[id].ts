import db from "@/db/drizzle";
import {
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listsTable,
} from "@/db/schema";
import type { APIRoute } from "astro";
import { and, eq } from "drizzle-orm";

export const GET: APIRoute = async ({ locals, params }) => {
  const { userId } = locals.auth();
  const { id = "" } = params;

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const lists = await db.select().from(listsTable).where(eq(listsTable.id, id));

  if (lists.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  if (lists[0].user !== userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = { ...lists[0] };
  return new Response(JSON.stringify(result));
};
