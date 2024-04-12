import { z } from "zod";
import { v4 as uuid } from "uuid";

export const weightUnits = ["g", "kg", "lb", "oz"] as const;
export const zWeightUnits = z.enum(weightUnits);

export const zItem = z.object({
  id: z.string().default(() => uuid()),
  name: z.string().default(""),
  description: z.string().default(""),
  weight: z.number().default(0),
  weightUnit: zWeightUnits.default("g"),
  imageUrl: z.string().optional(),
});
export type Item = z.infer<typeof zItem>;

export const zCategoryItem = z.object({
  id: z.string().default(() => uuid()),
  itemId: z.string().default(""),
  quantity: z.number().default(1),
  packed: z.boolean().default(false),
});
export type CategoryItem = z.infer<typeof zCategoryItem>;

export const zCategory = z.object({
  id: z.string().default(() => uuid()),
  name: z.string().default(""),
  items: z.array(zCategoryItem).default([]),
});
export type Category = z.infer<typeof zCategory>;

export const zList = z.object({
  id: z.string().default(() => uuid()),
  name: z.string().default(""),
  description: z.string().default(""),
  categories: z.array(zCategory).default([]),
});
export type List = z.infer<typeof zList>;

export const zItemsLists = z.object({
  lists: z.array(zList).default([]),
  items: z.array(zItem).default([]),
});
export type ItemsLists = z.infer<typeof zItemsLists>;
