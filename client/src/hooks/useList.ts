import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type { ClientResponseError } from "pocketbase";
import { push as goto } from "svelte-spa-router";

import { queryClient } from "@/lib/query";
import {
  type CategoriesItemsResponse,
  type ListCategoriesResponse,
  type ItemsResponse,
  Collections,
  type ListsResponse,
} from "@/lib/types";

const CATEGORY_ITEM_EXPAND_KEY = "categories_items(category)";

type CategoriesItemsExpandItem = CategoriesItemsResponse<{
  item: ItemsResponse;
}>;

type CategoriesExpandCategoriesItems = ListCategoriesResponse<{
  [CATEGORY_ITEM_EXPAND_KEY]: CategoriesItemsExpandItem[];
}>;

export type ExpandedCategoryItem = CategoriesItemsExpandItem & {
  itemData: ItemsResponse;
};

export type ExpandedCategory = CategoriesExpandCategoriesItems & {
  items: ExpandedCategoryItem[];
};

export type ListWithCategories = ListsResponse & {
  categories: ExpandedCategory[];
};

const expandItems = (
  record: CategoriesItemsExpandItem,
): ExpandedCategoryItem => ({
  ...record,
  itemData: record.expand?.item ?? ({} as ItemsResponse),
});

const expandCategory = (
  record: CategoriesExpandCategoriesItems,
): ExpandedCategory => ({
  ...record,
  items:
    record.expand?.[CATEGORY_ITEM_EXPAND_KEY]?.map(expandItems).sort(
      (a: ExpandedCategoryItem, b: ExpandedCategoryItem) =>
        a.sort_order - b.sort_order,
    ) ?? [],
});

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
          .getFullList<CategoriesExpandCategoriesItems>({
            filter: `list = "${listId}"`,
            sort: "sort_order",
            expand: "categories_items(category).item",
          })
          .then((data) => data.map(expandCategory)),
      ]);
      return { ...list, categories };
    },
  });

export const useLists = () =>
  createQuery<ListsResponse[], ClientResponseError>({
    queryKey: ["lists"],
    queryFn: () =>
      pb.collection(Collections.Lists).getFullList({ sort: "sort_order" }),
  });

export const useCreateList = () =>
  createMutation({
    mutationFn: () =>
      pb.collection(Collections.Lists).create({
        user: pb.authStore.model?.id,
        sort_order:
          queryClient.getQueryData<ListsResponse[]>(["lists"])?.length ?? 0,
        weight_unit: "g",
      }),
    onSuccess: (data) => {
      goto(`/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

export const useRemoveList = () =>
  createMutation({
    mutationFn: (id: string) => pb.collection(Collections.Lists).delete(id),
    onSuccess: (_, variables) =>
      currentList.subscribe((listId) => {
        if (listId === variables) goto("/");
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });

export const useUpdateList = () =>
  createMutation({
    mutationFn: (variables: {
      id: string;
      list: Partial<ListWithCategories>;
    }) => pb.collection(Collections.Lists).update(variables.id, variables.list),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["lists"] });
      }),
  });

export const useUpdateListsOrder = () =>
  createMutation({
    mutationFn: (variables: { listIds: string[] }) =>
      Promise.all(
        variables.listIds.map((id, index) =>
          pb.collection(Collections.Lists).update(id, { sort_order: index }),
        ),
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });
