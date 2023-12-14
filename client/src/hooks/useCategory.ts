import { pb } from "@/lib/pocketbase";
import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { RecordModel } from "pocketbase";
import type { ExpandedCategory } from "./useList";
import { isCategoryFullyPacked, isItemUntouched } from "@/lib/helpers";
import { currentList } from "@/lib/store";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";

export const useUpdateCategory = () =>
  createMutation({
    mutationFn: (variables: {
      id: string;
      category: Partial<ExpandedCategory>;
    }) =>
      pb
        .collection(Collections.ListCategories)
        .update(variables.id, variables.category),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
      }),
  });

export const useDeleteCategory = () =>
  createMutation({
    mutationFn: (category: ExpandedCategory) =>
      Promise.all([
        pb.collection("list_categories").delete(category.id),
        ...category.items
          .filter(isItemUntouched)
          .map((i) => pb.collection("items").delete(i.itemData.id)),
      ]),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useCreateCategory = () =>
  createMutation({
    mutationFn: (listId: string) =>
      pb.collection("list_categories").create({ list: listId }),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
      }),
  });

export const useToggleCategoryPacked = () =>
  createMutation({
    mutationFn: (category: ExpandedCategory) => {
      const isFullyPacked = isCategoryFullyPacked(category);
      return Promise.all(
        category.items.map((i) =>
          pb
            .collection("categories_items")
            .update(i.id, { packed: !isFullyPacked }),
        ),
      );
    },
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
      }),
  });

