import { pb } from "@/lib/pocketbase";
import { createMutation } from "@tanstack/svelte-query";
import { type ExpandedCategory, type ListWithCategories } from "./useList";
import { isCategoryFullyPacked, isItemUntouched } from "@/lib/helpers";
import { currentList } from "@/lib/store";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { createEventDispatcher, tick } from "svelte";

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
        pb.collection(Collections.ListCategories).delete(category.id),
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

export const useCreateCategory = () => {
  const dispatch = createEventDispatcher();
  return createMutation({
    mutationFn: (listId: string) =>
      pb.collection(Collections.ListCategories).create({
        list: listId,
        sort_order:
          queryClient.getQueryData<ListWithCategories>(["list", listId])
            ?.categories.length ?? 0,
      }),
    onSuccess: (data) =>
      currentList.subscribe(async (listId) => {
        await queryClient.invalidateQueries({ queryKey: ["list", listId] });
        await tick();
        dispatch("categoryCreated", { id: data.id });
      }),
  });
};

export const useToggleCategoryPacked = () =>
  createMutation({
    mutationFn: (category: ExpandedCategory) => {
      const isFullyPacked = isCategoryFullyPacked(category);
      return Promise.all(
        category.items.map((i) =>
          pb
            .collection(Collections.CategoriesItems)
            .update(i.id, { packed: !isFullyPacked }),
        ),
      );
    },
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
      }),
  });

export const useUpdateCategoriesOrder = () =>
  createMutation({
    mutationFn: (variables: { categoryIds: string[] }) =>
      Promise.all(
        variables.categoryIds.map((id, index) =>
          pb
            .collection(Collections.ListCategories)
            .update(id, { sort_order: index }),
        ),
      ),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
      }),
  });
