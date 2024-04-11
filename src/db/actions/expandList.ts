import { z } from "zod";
import {
  categoriesItemsTable,
  categoriesTable,
  categoryItemSchema,
  categorySchema,
  itemSchema,
  itemsTable,
  listSchema,
  listsTable,
} from "../schema";
import db from "../drizzle";
import { eq } from "drizzle-orm";

export const expandedCategoryItemSchema = categoryItemSchema.extend({
  itemData: itemSchema,
});
export type ExpandedCategoryItem = z.infer<typeof expandedCategoryItemSchema>;

export const expandedCategorySchema = categorySchema.extend({
  items: z.array(expandedCategoryItemSchema),
});
export type ExpandedCategory = z.infer<typeof expandedCategorySchema>;

export const expandedListSchema = listSchema.extend({
  categories: z.array(expandedCategorySchema),
});
export type ExpandedList = z.infer<typeof expandedListSchema>;

export default async function expandList(
  listId: string
): Promise<ExpandedList | undefined> {
  const list = await db.query.listsTable.findFirst({
    where: eq(listsTable.id, listId),
  });

  if (!list) return;

  const categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.list, listId));

  const categoryItems = await db
    .select()
    .from(categoriesItemsTable)
    .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id));

  const expandedCategories = categories.map((category) => {
    const items = categoryItems
      .filter((ci) => ci.categories_items.category === category.id)
      .filter((ci) => ci.items !== null)
      .map((ci) => ({ ...ci.categories_items, itemData: ci.items! }));

    return { ...category, items };
  });

  return { ...list, categories: expandedCategories };
}
