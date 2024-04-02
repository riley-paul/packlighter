import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const client = createClient({ url: "file:local.db" });
export const db = drizzle(client);

export const items = sqliteTable("items", {
  id: text("id").default(sql`(UUID())`),
  created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  description: text("description"),
});
