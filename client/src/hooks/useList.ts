import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import {
  QueryClient,
  createMutation,
  createQuery,
} from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { push as goto } from "svelte-spa-router";
import { get } from "svelte/store";

export type ExpandedCategoryItem = RecordModel & { itemData: RecordModel };
const expandItems = (record: RecordModel): ExpandedCategoryItem => ({
  ...record,
  itemData: record.expand?.item ?? {},
});

export type ExpandedCategory = RecordModel & { items: ExpandedCategoryItem[] };
const expandCategory = (record: RecordModel): ExpandedCategory => ({
  ...record,
  items:
    record.expand?.["categories_items(category)"]
      ?.map(expandItems)
      .sort(
        (a: ExpandedCategoryItem, b: ExpandedCategoryItem) =>
          a.sort_order - b.sort_order,
      ) ?? [],
});

export type ListWithCategories = RecordModel & {
  categories: ExpandedCategory[];
};

export const useList = (listId: string) =>
  createQuery<ListWithCategories, ClientResponseError>({
    queryKey: ["list", listId],
    queryFn: async () => {
      const [list, categories] = await Promise.all([
        pb.collection("lists").getOne(listId ?? "", { requestKey: null }),
        pb
          .collection("list_categories")
          .getFullList({
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
  createQuery<RecordModel[], ClientResponseError>({
    queryKey: ["lists"],
    queryFn: () => pb.collection("lists").getFullList({ sort: "-created" }),
  });

export const useCreateList = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: () =>
      pb.collection("lists").create({ user: pb.authStore.model?.id }),
    onSuccess: (data) => {
      goto(`/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

export const useRemoveList = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (id: string) => pb.collection("lists").delete(id),
    onSuccess: (data, variables) =>
      currentList.subscribe((listId) => {
        if (listId === variables) goto("/");
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });

export const useUpdateList = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (list: RecordModel) =>
      pb.collection("lists").update(list.id, list),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });
