import type { WeightUnit } from "@/db/enums";
import type {
  ExpandedCategory,
  ExpandedCategoryItem,
  ExpandedList,
  Item,
} from "@/db/schema";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);

export const isCategoryPartiallyPacked = (category: ExpandedCategory) =>
  category.items.some((i) => i.packed);

export const isItemUntouched = (item: ExpandedCategoryItem) =>
  !item.itemData.name &&
  !item.itemData.name &&
  item.quantity === 1 &&
  !item.packed;

export const getListItemIds = (list: ExpandedList): string[] =>
  list.categories.map((c) => c.items.map((i) => i.item)).flat();

export const getSortOrderFromIndex = (
  sortOrders: number[],
  insertionIndex: number
): number => {
  if (insertionIndex <= 0) return sortOrders[0] - 1;
  if (insertionIndex >= sortOrders.length)
    return sortOrders[sortOrders.length - 1] + 1;
  return (sortOrders[insertionIndex - 1] + sortOrders[insertionIndex]) / 2;
};

export const getItemWeightInUnit = (item: Item, unit: WeightUnit) => {
  const gramsConversions: Record<WeightUnit, number> = {
    oz: 28.3495,
    lb: 453.592,
    kg: 1000,
    g: 1,
  };
  const weight_g = item.weight * gramsConversions[item.weightUnit];
  return weight_g / gramsConversions[unit];
};

export const getCategoryWeight = (
  category: ExpandedCategory,
  unit: WeightUnit
) =>
  category.items.reduce((acc, item) => {
    const itemWeight = getItemWeightInUnit(item.itemData, unit);
    return acc + itemWeight * item.quantity;
  }, 0);

export const formatWeight = (value: number): string => {
  if (value < 10) return (Math.round(value * 100) / 100).toLocaleString("en");
  if (value < 100) return (Math.round(value * 10) / 10).toLocaleString("en");
  return Math.round(value).toLocaleString("en");
};
