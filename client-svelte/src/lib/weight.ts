import { z } from 'zod';

type WeightUnit = {
	name: string;
	shortName: string;
	gMultiplier: number;
};

export enum WeightUnits {
	grams = 'g',
	kilograms = 'kg',
	pounds = 'lb',
	ounces = 'oz'
}

export const weightUnits: Record<WeightUnits, WeightUnit> = {
	[WeightUnits.grams]: { name: 'grams', shortName: 'g', gMultiplier: 1 },
	[WeightUnits.kilograms]: { name: 'kilograms', shortName: 'kg', gMultiplier: 1000 },
	[WeightUnits.pounds]: { name: 'pounds', shortName: 'lb', gMultiplier: 453.592 },
	[WeightUnits.ounces]: { name: 'ounces', shortName: 'oz', gMultiplier: 28.3495 }
};

export const zWeight = z.object({
	value: z.number().default(0),
	unit: z.nativeEnum(WeightUnits).default(WeightUnits.grams)
});
type Weight = z.infer<typeof zWeight>;

export function weightToGrams(weight: Weight): number {
	return weight.value * weightUnits[weight.unit].gMultiplier;
}
