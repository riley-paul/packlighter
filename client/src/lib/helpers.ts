import type { ExpandedCategory, ExpandedCategoryItem } from "@/hooks/useList";
import type { RecordModel } from "pocketbase";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);

export const isItemUntouched = (item: ExpandedCategoryItem) =>
  !item.itemData.name &&
  !item.itemData.name &&
  !item.itemData.image_url &&
  item.quantity === 1 &&
  !item.packed;

export const massUnits = ["g", "kg", "oz", "lb"];

export const getItemWeightInGrams = (item: RecordModel) => {
  const { weight, weight_unit } = item;
  if (!weight) return 0;
  if (weight_unit === "g") return weight;
  if (weight_unit === "kg") return weight * 1000;
  if (weight_unit === "oz") return weight * 28.3495;
  if (weight_unit === "lb") return weight * 453.592;
  return 0;
};

export const getItemWeightInUnit = (item: RecordModel) => {
  const { weight_g, weight_unit } = item;
  if (!weight_g) return 0;
  if (weight_unit === "g") return weight_g;
  if (weight_unit === "kg") return weight_g / 1000;
  if (weight_unit === "oz") return weight_g / 28.3495;
  if (weight_unit === "lb") return weight_g / 453.592;
  return 0;
};

export const createItemTemplateCols = (
  list: RecordModel,
  isItem: boolean,
): string => {
  const cols: string[] = [
    ...(list.show_packed ? ["auto"] : []),
    ...(isItem && list.show_images ? ["auto"] : []),
    "1fr", // name and description
    ...(list.show_weights ? ["6rem"] : []),
    "2.5rem", // quantity
    "auto", // delete button
    "auto", // gripper
  ];
  return cols.join(" ");
};
