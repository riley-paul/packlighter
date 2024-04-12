import { pb } from "@/lib/pocketbase";
import { type ExpandedCategory, type ListWithCategories } from "./list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { isCategoryFullyPacked, isItemUntouched } from "@/lib/helpers";

const categoryActions = {
  update: (input: { id: string; category: Partial<ExpandedCategory> }) => {
    return pb
      .collection(Collections.ListCategories)
      .update(input.id, input.category);
  },
  delete: (category: ExpandedCategory) => {
    return Promise.all([
      pb.collection(Collections.ListCategories).delete(category.id),
      ...category.items
        .filter(isItemUntouched)
        .map((i) => pb.collection(Collections.Items).delete(i.itemData.id)),
    ]);
  },
  create: (listId: string) => {
    const currentCategories =
      queryClient.getQueryData<ListWithCategories>([Collections.Lists, listId])
        ?.categories ?? [];
    const maxSortOrder = Math.max(
      ...currentCategories.map((c) => c.sort_order)
    );

    return pb.collection(Collections.ListCategories).create({
      list: listId,
      sort_order: maxSortOrder + 1,
    });
  },
  togglePacked: (category: ExpandedCategory) => {
    const isFullyPacked = isCategoryFullyPacked(category);
    return Promise.all(
      category.items.map((i) =>
        pb
          .collection(Collections.CategoriesItems)
          .update(i.id, { packed: !isFullyPacked })
      )
    );
  },
  reorder: (categoryIds: string[]) =>
    Promise.all(
      categoryIds.map((id, index) =>
        pb
          .collection(Collections.ListCategories)
          .update(id, { sort_order: index })
      )
    ),
};

export default categoryActions;
