import { createMutation } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem } from "./useList";
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
