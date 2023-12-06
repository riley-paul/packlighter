import type { ExpandedCategory, ExpandedCategoryItem } from "@/hooks/useList";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);

export const isItemUntouched = (item: ExpandedCategoryItem) =>
  !item.itemData.name &&
  !item.itemData.name &&
  !item.itemData.image_url &&
  item.quantity === 1 &&
  !item.packed;
