import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  weight_g: z.number(),
});
export type ItemType = z.infer<typeof itemSchema>;
export const initItem = (data?: Partial<ItemType>): ItemType => ({
  name: "",
  description: "",
  image_url: "",
  weight_g: 0,
  ...data,
  id: uuidv4(),
});

export const listItemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  quantity: z.number(),
  packed: z.boolean(),
});
export type ListItemType = z.infer<typeof listItemSchema>;
export const initListItem = (itemId: string): ListItemType => ({
  itemId,
  quantity: 1,
  packed: false,
  id: uuidv4(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(listItemSchema),
});
export type CategoryType = z.infer<typeof categorySchema>;
export const initCategory = (data?: Partial<CategoryType>): CategoryType => ({
  name: "",
  items: [],
  ...data,
  id: uuidv4(),
});

export const listSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categories: z.array(categorySchema),
});
export type ListType = z.infer<typeof listSchema>;
export const initList = (data?: Partial<ListType>): ListType => ({
  name: "",
  description: "",
  categories: [initCategory()],
  ...data,
  id: uuidv4(),
});

export const appDataSchema = z.object({
  items: z.array(itemSchema),
  lists: z.array(listSchema),
});
export type AppDataType = z.infer<typeof appDataSchema>;
export const initAppData = (): AppDataType => ({
  items: [],
  lists: [initList()],
});
