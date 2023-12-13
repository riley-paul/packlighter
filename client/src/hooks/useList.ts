import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { push as goto } from "svelte-spa-router";

import { queryClient } from "@/lib/query";
import {
  Collections,
  type CategoriesItemsResponse,
  type ListCategoriesRecord,
  type ListCategoriesResponse,
  type ListsRecord,
  type CategoriesItemsRecord,
} from "@/lib/types";

export type ExpandedCategoryItem = CategoriesItemsRecord & {
  itemData: RecordModel;
};
const expandItems = (record: ExpandedCategoryItem): ExpandedCategoryItem => ({
  ...record,
  itemData: record.expand?.item ?? {},
});

export type ExpandedCategory = ListCategoriesRecord & {
  items: ExpandedCategoryItem[];
};
const expandCategory = (record: ListCategoriesRecord): ExpandedCategory => ({
  ...record,
  items:
    record.expand?.["categories_items(category)"]
      ?.map(expandItems)
      .sort(
        (a: ExpandedCategoryItem, b: ExpandedCategoryItem) =>
          a.sort_order - b.sort_order,
      ) ?? [],
});

export type ListWithCategories = ListsRecord & {
  categories: ExpandedCategory[];
};

export const useList = (listId: string) =>
  createQuery<ListWithCategories, ClientResponseError>({
    queryKey: ["list", listId],
    queryFn: async () => {
      const [list, categories] = await Promise.all([
        pb
          .collection(Collections.Lists)
          .getOne(listId ?? "", { requestKey: null }),
        pb
          .collection(Collections.ListCategories)
          .getFullList<
            ListCategoriesResponse<{
              "categories_items(category)": CategoriesItemsResponse;
            }>
          >({
            filter: `list = "${listId}"`,
            sort: "created",
            expand: "categories_items(category).item",
          })
          .then((data) => data.map(expandCategory)),
      ]);
      return { ...list, categories };
    },
  });

export const useLists = () =>
  createQuery<ListsRecord[], ClientResponseError>({
    queryKey: ["lists"],
    queryFn: () =>
      pb.collection(Collections.Lists).getFullList({ sort: "-created" }),
  });

export const useCreateList = () =>
  createMutation({
    mutationFn: () =>
      pb.collection("lists").create({ user: pb.authStore.model?.id }),
    onSuccess: (data) => {
      goto(`/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

export const useRemoveList = () =>
  createMutation({
    mutationFn: (id: string) => pb.collection("lists").delete(id),
    onSuccess: (data, variables) =>
      currentList.subscribe((listId) => {
        if (listId === variables) goto("/");
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });

export const useUpdateList = () =>
  createMutation({
    mutationFn: (variables: { id: string; list: Partial<RecordModel> }) =>
      pb.collection("lists").update(variables.id, variables.list),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });
