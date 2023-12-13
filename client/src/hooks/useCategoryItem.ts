import { createMutation } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem, ListWithCategories } from "./useList";
import { pb } from "@/lib/pocketbase";
import { isItemUntouched } from "@/lib/helpers";
import type { RecordModel } from "pocketbase";
import { currentList } from "@/lib/store";

import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";

export const useUpdateCategoryItem = () =>
  createMutation({
    mutationFn: (variables: {
      id: string;
      categoryItem: Partial<ExpandedCategoryItem>;
    }) => {
      const { categoryItem } = variables;
      const p1 = pb
        .collection(Collections.CategoriesItems)
        .update(variables.id || "", variables.categoryItem);
      const p2 = categoryItem.item
        ? pb
            .collection(Collections.Items)
            .update(categoryItem.item, categoryItem.itemData)
        : Promise.resolve();
      return Promise.all([p1, p2]);
    },
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useDeleteCategoryItem = () =>
  createMutation({
    mutationFn: (categoryItem: ExpandedCategoryItem) =>
      Promise.all([
        pb.collection(Collections.CategoriesItems).delete(categoryItem.id),
        isItemUntouched(categoryItem)
          ? pb.collection(Collections.Items).delete(categoryItem.itemData.id)
          : Promise.resolve(),
      ]),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useCreateCategoryItem = () =>
  createMutation({
    mutationFn: (category: RecordModel) =>
      pb
        .collection(Collections.Items)
        .create({ user: pb.authStore.model?.id })
        .then((item) =>
          pb
            .collection(Collections.CategoriesItems)
            .create({ category: category.id, item: item.id, quantity: 1 }),
        ),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

// export const useMoveCategoryItem = () =>
//   createMutation({
//     mutationFn: (variables: { id: string; newCategory: string }) =>
//       pb
//         .collection("categories_items")
//         .update(variables.id, { category: variables.newCategory }),
//     onSuccess: () =>
//       currentList.subscribe((listId) =>
//         queryClient.invalidateQueries({ queryKey: ["list", listId] }),
//       ),
//     onMutate: (variables) =>
//       currentList.subscribe(async (listId) => {
//         // Cancel any outgoing refetches
//         // (so they don't overwrite our optimistic update)
//         await queryClient.cancelQueries({ queryKey: ["list", listId] });

//         // Snapshot the previous value
//         const previousList = queryClient.getQueryData(["list", listId]);

//         // Optimistically update to the new value
//         queryClient.setQueryData(
//           ["list", listId],
//           (old: ListWithCategories) => {
//             const categoryItem = old.categories
//               .flatMap((c) => c.items)
//               .find((i) => i.id === variables.id);
//             if (!categoryItem) return old;

//             return {
//               ...old,
//               categories: old.categories.map((c) =>
//                 c.id === variables.newCategory
//                   ? { ...c, items: [...c.items, categoryItem] }
//                   : c,
//               ),
//             };
//           },
//         );

//         // Return a context object with the snapshotted value
//         return { previousList };
//       }),
//     // If the mutation fails,
//     // use the context returned from onMutate to roll back
//     onError: (err, newTodo, context) =>
//       currentList.subscribe((listId) => {
//         queryClient.setQueryData(["list"], context.previousList);
//       }),
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });
