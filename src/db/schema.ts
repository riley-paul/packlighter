import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { weightUnits } from "./enums";
import { v4 as uuid } from "uuid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const itemsTable = sqliteTable("items", {
  id: text("id")
    .notNull()
    .$defaultFn(() => uuid())
    .primaryKey(),
  user: text("user").notNull(),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  description: text("description"),
  weight: real("weight").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),
});

export type Item = typeof itemsTable.$inferSelect;
export type ItemInsert = typeof itemsTable.$inferInsert;

export const itemSchema = createSelectSchema(itemsTable);
export const itemInsertSchema = createInsertSchema(itemsTable);

export const listsTable = sqliteTable("lists", {
  id: text("id")
    .notNull()
    .$defaultFn(() => uuid())
    .primaryKey(),
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

export type List = typeof listsTable.$inferSelect;
export type ListInsert = typeof listsTable.$inferInsert;

export const listSchema = createSelectSchema(listsTable);
export const listInsertSchema = createInsertSchema(listsTable);

export const categoriesTable = sqliteTable("categories", {
  id: text("id")
    .notNull()
    .$defaultFn(() => uuid())
    .primaryKey(),
  list: text("list")
    .notNull()
    .references(() => listsTable.id, { onDelete: "cascade" }),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Category = typeof categoriesTable.$inferSelect;
export type CategoryInsert = typeof categoriesTable.$inferInsert;

export const categorySchema = createSelectSchema(categoriesTable);
export const categoryInsertSchema = createInsertSchema(categoriesTable);

export const categoriesItemsTable = sqliteTable("categories_items", {
  id: text("id")
    .notNull()
    .$defaultFn(() => uuid())
    .primaryKey(),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  category: text("category")
    .notNull()
    .references(() => categoriesTable.id, { onDelete: "cascade" }),
  item: text("item")
    .notNull()
    .references(() => itemsTable.id, { onDelete: "cascade" }),
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

export type CategoryItem = typeof categoriesItemsTable.$inferSelect;
export type CategoryItemInsert = typeof categoriesItemsTable.$inferInsert;

export const categoryItemSchema = createSelectSchema(categoriesItemsTable);
export const categoryItemInsertSchema =
  createInsertSchema(categoriesItemsTable);
