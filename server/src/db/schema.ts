import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { v4 as uuid } from "uuid";
import { integer, real, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").$defaultFn(uuid).primaryKey().unique(),
  githubId: integer("github_id").unique(),
  username: text("username").notNull(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type User = typeof userTable.$inferSelect;

export const sessionTable = sqliteTable("user_session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type Session = typeof sessionTable.$inferSelect;

export const weightUnits = ["g", "kg", "oz", "lb"] as const;
export type WeightUnit = (typeof weightUnits)[number];

export const itemsTable = sqliteTable("items", {
  id: text("id")
    .notNull()
    .$defaultFn(() => uuid())
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  created: text("created")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  name: text("name").notNull().default(""),
  description: text("description").notNull().default(""),
  weight: real("weight").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),
  image: text("image"),
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
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
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
  showWeights: integer("show_weights", { mode: "boolean" })
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
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
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
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
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

// Extra types
export type ExpandedCategoryItem = CategoryItem & { itemData: Item };
export type ExpandedCategory = Category & { items: ExpandedCategoryItem[] };
export type ExpandedList = List & { categories: ExpandedCategory[] };
