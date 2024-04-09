import { getSortOrderFromIndex, isItemUntouched } from "@/lib/helpers";
import {
  type ListWithCategories,
  type ExpandedCategory,
  type ExpandedCategoryItem,
} from "./list";
import { pb } from "@/lib/pocketbase";

import { queryClient } from "@/lib/query";
import {
  type CategoriesItemsRecord,
  Collections,
  type ItemsResponse,
} from "@/lib/types";

export const updateCategoryItem = (variables: {
  id: string;
  categoryItem: Partial<CategoriesItemsRecord>;
  itemId?: string;
  item: Partial<ItemsResponse>;
}) => {
  const p1 = pb
    .collection(Collections.CategoriesItems)
    .update(variables.id, variables.categoryItem);
  const p2 = variables.itemId
    ? pb.collection(Collections.Items).update(variables.itemId, variables.item)
    : Promise.resolve();
  return Promise.all([p1, p2]);
};

export const deleteCategoryItem = (categoryItem: ExpandedCategoryItem) =>
  Promise.all([
    pb.collection(Collections.CategoriesItems).delete(categoryItem.id),
    isItemUntouched(categoryItem)
      ? pb.collection(Collections.Items).delete(categoryItem.itemData.id)
      : Promise.resolve(),
  ]);

export const createCategoryItem = (variables: {
  category: ExpandedCategory;
  listId: string;
  itemId?: string;
  insertionIndex?: number;
}) => {
  const maxSortOrder = Math.max(
    ...variables.category.items.map((i) => i.sort_order)
  );
  const sort_order =
    variables.insertionIndex !== undefined
      ? getSortOrderFromIndex(
          variables.category.items.map((i) => i.sort_order),
          variables.insertionIndex
        )
      : maxSortOrder + 1;

  // adding existing item to category
  if (variables.itemId)
    return pb.collection(Collections.CategoriesItems).create({
      category: variables.category.id,
      item: variables.itemId,
      quantity: 1,
      sort_order,
    });

  const currentList = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    variables.listId,
  ]);

  // adding new item to category
  return pb
    .collection(Collections.Items)
    .create({
      user: pb.authStore.model?.id,
      weight: 0,
      weight_unit: currentList?.weight_unit ?? "g",
      sort_order:
        queryClient.getQueryData<ItemsResponse[]>([Collections.Items])
          ?.length ?? 0,
    })
    .then((item) =>
      pb.collection(Collections.CategoriesItems).create({
        category: variables.category.id,
        item: item.id,
        quantity: 1,
        sort_order,
      })
    );
};

export const updateCategoryItemsOrder = (variables: {
  categoryItemIds: string[];
  categoryId: string;
}) =>
  Promise.all(
    variables.categoryItemIds.map((id, index) =>
      pb
        .collection(Collections.CategoriesItems)
        .update(id, { sort_order: index, category: variables.categoryId })
    )
  );
