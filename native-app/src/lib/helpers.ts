import type {
  ExpandedCategory,
  ExpandedCategoryItem,
  ListWithCategories,
} from "@/api/list";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);

export const isItemUntouched = (item: ExpandedCategoryItem) =>
  !item.itemData.name &&
  !item.itemData.name &&
  item.quantity === 1 &&
  !item.packed;

export const getListItemIds = (list: ListWithCategories): string[] =>
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
