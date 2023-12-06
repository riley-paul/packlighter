import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { ExpandedCategoryItem } from "./useList";
import { pb } from "@/lib/pocketbase";

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
          .update(categoryItem.itemData.id, categoryItem.itemData),
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
      pb.collection("categories_items").delete(categoryItem.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
