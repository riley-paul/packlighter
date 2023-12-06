import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem } from "./useList";
import { pb } from "@/lib/pocketbase";
import { isItemUntouched } from "@/lib/helpers";
import type { RecordModel } from "pocketbase";
import { currentList } from "@/lib/store";

export const useUpdateCategoryItem = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (categoryItem: ExpandedCategoryItem) =>
      Promise.all([
        pb.collection("categories_items").update(categoryItem.id, categoryItem),
        pb.collection("items").update(categoryItem.item, categoryItem.itemData),
      ]),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useDeleteCategoryItem = (queryClient: QueryClient) =>
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

export const useCreateCategoryItem = (queryClient: QueryClient) =>
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
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });
