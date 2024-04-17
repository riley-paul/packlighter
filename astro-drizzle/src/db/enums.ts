export const weightUnits = ["g", "kg", "oz", "lb"] as const;
export type WeightUnit = typeof weightUnits[number];
