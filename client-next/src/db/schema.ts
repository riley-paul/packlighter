import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { weightUnits } from "./enums";

export const items = sqliteTable("items", {
  id: text("id").default(sql`(UUID())`),
  user: text("user").notNull(),
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
  user: text("user").notNull(),
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

export const categories = sqliteTable("categories", {
  id: text("id").default(sql`(UUID())`),
  list: text("list")
    .notNull()
    .references(() => lists.id),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const categoriesItems = sqliteTable("categories_items", {
  id: text("id").default(sql`(UUID())`),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  category: text("category")
    .notNull()
    .references(() => categories.id),
  item: text("item")
    .notNull()
    .references(() => items.id),
  sortOrder: integer("sort_order").notNull().default(0),
  quantity: integer("quantity").notNull().default(1),
  wornWeight: integer("worn_weight", { mode: "boolean" })
    .notNull()
    .default(false),
  consWeight: integer("cons_weight", { mode: "boolean" })
    .notNull()
    .default(false),
  packed: integer("packed", { mode: "boolean" }).notNull().default(false),
});
