import { pb } from "@/lib/pocketbase";
import { type ExpandedCategory, type ListWithCategories } from "./list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { isCategoryFullyPacked, isItemUntouched } from "@/lib/helpers";

export const updateCategory = (variables: {
  id: string;
  category: Partial<ExpandedCategory>;
}) =>
  pb
    .collection(Collections.ListCategories)
    .update(variables.id, variables.category);

export const deleteCategory = (category: ExpandedCategory) =>
  Promise.all([
    pb.collection(Collections.ListCategories).delete(category.id),
    ...category.items
      .filter(isItemUntouched)
      .map((i) => pb.collection(Collections.Items).delete(i.itemData.id)),
  ]);

export const createCategory = (listId: string) => {
  const currentCategories =
    queryClient.getQueryData<ListWithCategories>([Collections.Lists, listId])
      ?.categories ?? [];
  const maxSortOrder = Math.max(...currentCategories.map((c) => c.sort_order));

  return pb.collection(Collections.ListCategories).create({
    list: listId,
    sort_order: maxSortOrder + 1,
  });
};

export const toggleCategoryPacked = (category: ExpandedCategory) => {
  const isFullyPacked = isCategoryFullyPacked(category);
  return Promise.all(
    category.items.map((i) =>
      pb
        .collection(Collections.CategoriesItems)
        .update(i.id, { packed: !isFullyPacked })
    )
  );
};

export const updateCategoriesOrder = (variables: { categoryIds: string[] }) =>
  Promise.all(
    variables.categoryIds.map((id, index) =>
      pb
        .collection(Collections.ListCategories)
        .update(id, { sort_order: index })
    )
  );
