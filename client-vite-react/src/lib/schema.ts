import { z } from "Zod";
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
  id: uuidv4(),
  name: "",
  description: "",
  image_url: "",
  weight_g: 0,
  ...data,
});

export const listItemSchema = z.object({
  id: z.string(),
  listId: z.string(),
  quantity: z.number(),
  packed: z.boolean(),
});
export type ListIemType = z.infer<typeof listItemSchema>;
export const initListItem = (listId: string): ListIemType => ({
  id: uuidv4(),
  listId,
  quantity: 1,
  packed: false,
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(listItemSchema),
});
export type CategoryType = z.infer<typeof categorySchema>;
export const initCategory = (data?: Partial<CategoryType>): CategoryType => ({
  id: uuidv4(),
  name: "",
  items: [],
  ...data,
});

export const listSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categories: z.array(categorySchema),
});
export type ListType = z.infer<typeof listSchema>;
export const initList = (data?: Partial<ListType>): ListType => ({
  id: uuidv4(),
  name: "",
  description: "",
  categories: [initCategory()],
  ...data,
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
