import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/index.ts";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

export const validIdSchema = (table: SQLiteTable) =>
  z.string().refine(async (value) => {
    // @ts-ignore
    const list = await db.select().from(table).where(eq(table.id, value));
    return list.length > 0;
  });
