import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem } from "./useList";
import { pb } from "@/lib/pocketbase";
import { isItemUntouched } from "@/lib/helpers";
import type { RecordModel } from "pocketbase";

export const useUpdateCategoryItem = (
  queryClient: QueryClient,
  listId: string
) =>
  createMutation({
    mutationFn: (categoryItem: ExpandedCategoryItem) =>
      Promise.all([
        pb.collection("categories_items").update(categoryItem.id, categoryItem),
        pb
          .collection("items")
          .update(categoryItem.item, categoryItem.itemData),
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

export const useDeleteCategoryItem = (
  queryClient: QueryClient,
  listId: string
) =>
  createMutation({
    mutationFn: (categoryItem: ExpandedCategoryItem) =>
      Promise.all([
        pb.collection("categories_items").delete(categoryItem.id),
        isItemUntouched(categoryItem)
          ? pb.collection("items").delete(categoryItem.itemData.id)
          : Promise.resolve(),
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

export const useCreateCategoryItem = (
  queryClient: QueryClient,
  listId: string
) =>
  createMutation({
    mutationFn: (category: RecordModel) =>
      pb
        .collection("items")
        .create({ user: pb.authStore.model?.id })
        .then((item) =>
          pb
            .collection("categories_items")
            .create({ category: category.id, item: item.id, quantity: 1 })
        ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
