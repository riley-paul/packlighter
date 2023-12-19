import type {
  ExpandedCategory,
  ExpandedCategoryItem,
  ListWithCategories,
} from "@/hooks/useList";
import type { RecordModel } from "pocketbase";
import { Collections, type ItemsResponse } from "./types";
import {
  SHADOW_PLACEHOLDER_ITEM_ID,
  type TransformDraggedElementFunction,
} from "svelte-dnd-action";
import { DRAGGABLE_CLASS, isDraggingClasslist } from "./constants";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);

export const isItemUntouched = (item: ExpandedCategoryItem) =>
  !item.itemData.name &&
  !item.itemData.name &&
  !item.itemData.image_url &&
  item.quantity === 1 &&
  !item.packed;

export const massUnits = ["g", "kg", "oz", "lb"] as const;
export type MassUnit = (typeof massUnits)[number];

export const getWeightInGrams = (weight: number, unit: MassUnit) => {
  if (unit === "g") return weight;
  if (unit === "kg") return weight * 1000;
  if (unit === "oz") return weight * 28.3495;
  if (unit === "lb") return weight * 453.592;
  return 0;
};

export const getWeightInUnit = (weight: number, unit: MassUnit) => {
  if (unit === "g") return weight;
  if (unit === "kg") return weight / 1000;
  if (unit === "oz") return weight / 28.3495;
  if (unit === "lb") return weight / 453.592;
  return 0;
};

export const createItemTemplateCols = (
  list: ListWithCategories,
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

export const getListItemIds = (list: ListWithCategories): string[] =>
  list.categories.map((c) => c.items.map((i) => i.item)).flat();

export const createTempCategoryItem = (
  item: ItemsResponse,
): ExpandedCategoryItem => {
  return {
    id: SHADOW_PLACEHOLDER_ITEM_ID,
    category: SHADOW_PLACEHOLDER_ITEM_ID,
    collectionId: "sydktarhcp2ongv",
    itemData: item,
    quantity: 1,
    packed: false,
    item: item.id,
    cons_weight: false,
    sort_order: 0,
    worn_weight: false,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    collectionName: Collections.CategoriesItems,
  };
};

export const getSortOrderFromIndex = (
  sortOrders: number[],
  insertionIndex: number,
): number => {
  if (insertionIndex <= 0) return sortOrders[0] - 1;
  if (insertionIndex >= sortOrders.length)
    return sortOrders[sortOrders.length - 1] + 1;
  return (sortOrders[insertionIndex - 1] + sortOrders[insertionIndex]) / 2;
};

export const transformDraggedElement: TransformDraggedElementFunction = (el) =>
  el
    ?.querySelector(`.${DRAGGABLE_CLASS}`)
    ?.classList.add(...isDraggingClasslist);

export function waitForElm<T extends Element>(
  selector: string,
): Promise<T | null> {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector<T>(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector<T>(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
