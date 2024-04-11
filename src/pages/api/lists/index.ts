import db from "@/db/drizzle";
import { listsTable } from "@/db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

export const GET: APIRoute = async ({ locals }) => {
  const { userId } = locals.auth();

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const lists = await db
    .select()
    .from(listsTable)
    .where(eq(listsTable.user, userId));

  return new Response(JSON.stringify(lists));
};
