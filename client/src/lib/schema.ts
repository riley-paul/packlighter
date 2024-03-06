import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { zWeight } from './weight';

const zItem = z.object({
	id: z.string().uuid().default(uuid()),
	name: z.string().default(''),
	description: z.string().default(''),
	weight: zWeight,
	image: z.string().optional(),
	price: z.number().optional()
});
export type Item = z.infer<typeof zItem>;
export const initItem = (): Item => zItem.parse({});

const zCategory = z.object({
	id: z.string().uuid().default(uuid()),
	name: z.string().default(''),
	items: z.array(z.string().uuid()).default([])
});
export type Category = z.infer<typeof zCategory>;
export const initCategory = (): Category => zCategory.parse({});

const zListOptions = z.object({
	showImages: z.boolean().default(false),
	showPacked: z.boolean().default(false),
	showPrices: z.boolean().default(false),
	showWeights: z.boolean().default(false)
});
export type ListOptions = z.infer<typeof zListOptions>;
export const initListOptions = (): ListOptions => zListOptions.parse({});

const zList = z.object({
	id: z.string().uuid().default(uuid()),
	name: z.string().default(''),
	description: z.string().default(''),
	categories: z.array(zCategory).default([]),
	options: zListOptions
});
export type List = z.infer<typeof zList>;
export const initList = (): List => zList.parse({});

export const zSchema = z.object({
	items: z.array(zItem).default([]),
	lists: z.array(zList).default([])
});
export type Schema = z.infer<typeof zSchema>;
export const initSchema = (): Schema => zSchema.parse({});
