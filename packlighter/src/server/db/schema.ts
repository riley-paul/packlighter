import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const weightUnits = ["g", "kg", "oz", "lb"] as const;
export type WeightUnit = (typeof weightUnits)[number];

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `packlighter_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    uuid: varchar("uuid").default(sql`gen_random_uuid ()`),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const items = createTable("item", {
  id: varchar("id")
    .notNull()
    .default(sql`gen_random_uuid ()`)
    .primaryKey(),
  userId: varchar("user_id").notNull(),
  name: varchar("name").notNull().default(""),
  description: text("description").notNull().default(""),
  weight: real("weight").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),
  image: text("image"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type Item = typeof items.$inferSelect;
export type ItemInsert = typeof items.$inferInsert;

export const itemSchema = createSelectSchema(items);
export const itemInsertSchema = createInsertSchema(items);

export const lists = createTable("list", {
  id: varchar("id")
    .notNull()
    .default(sql`gen_random_uuid ()`)
    .primaryKey(),
  userId: varchar("user_id").notNull(),

  name: varchar("name"),
  description: text("description"),

  showImages: boolean("show_images").notNull().default(false),
  showPrices: boolean("show_prices").notNull().default(false),
  showPacked: boolean("show_packed").notNull().default(false),
  showWeights: boolean("show_weights").notNull().default(false),

  sortOrder: integer("sort_order").notNull().default(0),
  weightUnit: text("weight_unit", { enum: weightUnits }).notNull().default("g"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type List = typeof lists.$inferSelect;
export type ListInsert = typeof lists.$inferInsert;

export const listSchema = createSelectSchema(lists);
export const listInsertSchema = createInsertSchema(lists);

export const categories = createTable("category", {
  id: varchar("id")
    .notNull()
    .default(sql`gen_random_uuid ()`)
    .primaryKey(),
  listId: varchar("list_id")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade" }),

  name: varchar("name"),
  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type Category = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;

export const categorySchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);

export const categoriesItems = createTable("categories_items", {
  id: varchar("id")
    .notNull()
    .default(sql`gen_random_uuid ()`)
    .primaryKey(),
  categoryId: varchar("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  itemId: text("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").notNull().default(0),
  quantity: integer("quantity").notNull().default(1),

  wornWeight: boolean("worn_weight").notNull().default(false),
  consWeight: boolean("cons_weight").notNull().default(false),

  packed: boolean("packed").notNull().default(false),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export type CategoryItem = typeof categoriesItems.$inferSelect;
export type CategoryItemInsert = typeof categoriesItems.$inferInsert;

export const categoryItemSchema = createSelectSchema(categoriesItems);
export const categoryItemInsertSchema = createInsertSchema(categoriesItems);

// Extra types
export type ExpandedCategoryItem = CategoryItem & { itemData: Item };
export type ExpandedCategory = Category & { items: ExpandedCategoryItem[] };
export type ExpandedList = List & { categories: ExpandedCategory[] };

// -------------- USERS ---------------

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
