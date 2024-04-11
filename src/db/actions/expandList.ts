import { z } from "zod";
import {
  categoriesItemsTable,
  categoriesTable,
  categoryItemSchema,
  categorySchema,
  itemSchema,
  itemsTable,
  listSchema,
} from "../schema";
import db from "../drizzle";
import { eq } from "drizzle-orm";

export const expandedCategoryItemSchema = z.object({
  [categoriesItemsTable._.name]: categoryItemSchema,
  [categoriesTable._.name]: categorySchema,
  [itemsTable._.name]: itemSchema,
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
): Promise<ExpandedList | undefined >{

  const list = await db.query.listsTable.findFirst({where: })

  const categoryItems: ExpandedCategoryItem[] = await db
    .select()
    .from(categoriesItemsTable)
    .leftJoin(
      categoriesTable,
      eq(categoriesItemsTable.category, categoriesTable.id)
    )
    .leftJoin(itemsTable, eq(categoriesItemsTable.item, itemsTable.id))
    .where(eq(categoriesTable.list, listId));

  const categories: ExpandedCategory[] = categoryItems.reduce((acc, val) => {
    const category = acc.find((c) => c.id === val.category);
    if (category) {
      category.items.push(val);
    } else {
      acc.push({
        ...val,
        items: [val],
      });
    }
    return acc;
  },[])
  
  
  return undefined;
}
