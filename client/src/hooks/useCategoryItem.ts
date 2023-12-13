import { createMutation } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem, ListWithCategories } from "./useList";
import { pb } from "@/lib/pocketbase";
import { isItemUntouched } from "@/lib/helpers";
import type { RecordModel } from "pocketbase";
import { currentList } from "@/lib/store";

import { queryClient } from "@/lib/query";

export const useUpdateCategoryItem = () =>
  createMutation({
    mutationFn: (categoryItem: Partial<ExpandedCategoryItem>) =>
      Promise.all([
        pb
          .collection("categories_items")
          .update(categoryItem.id || "", categoryItem),
        categoryItem.item
          ? pb
              .collection("items")
              .update(categoryItem.item, categoryItem.itemData)
          : Promise.resolve(),
      ]),
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
        pb.collection("categories_items").delete(categoryItem.id),
        isItemUntouched(categoryItem)
          ? pb.collection("items").delete(categoryItem.itemData.id)
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
        .collection("items")
        .create({ user: pb.authStore.model?.id })
        .then((item) =>
          pb
            .collection("categories_items")
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
