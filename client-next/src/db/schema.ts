import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { weightUnits } from "./enums";

export const items = sqliteTable("items", {
  id: text("id").default(sql`(UUID())`),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  description: text("description"),
  weight: real("weight").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),
});

export const lists = sqliteTable("lists", {
  id: text("id").default(sql`(UUID())`),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  description: text("description"),
  showImages: integer("show_images", { mode: "boolean" })
    .notNull()
    .default(false),
  showPrices: integer("show_prices", { mode: "boolean" })
    .notNull()
    .default(false),
  showPacked: integer("show_packed", { mode: "boolean" })
    .notNull()
    .default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),
});
