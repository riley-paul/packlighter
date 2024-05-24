import { pb } from "@/lib/pocketbase";
import { queryClient } from "@/lib/query";
import {
  type CategoriesItemsResponse,
  type ListCategoriesResponse,
  type ItemsResponse,
  type ListsResponse,
  Collections,
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

const listActions = {
  get: () => {
    return pb.collection(Collections.Lists).getFullList({ sort: "sort_order" });
  },
  getById: async (listId: string) => {
    const expandItems = (
      record: CategoriesItemsExpandItem
    ): ExpandedCategoryItem => ({
      ...record,
      itemData: record.expand?.item ?? ({} as ItemsResponse),
    });

    const expandCategory = (
      record: CategoriesExpandCategoriesItems
    ): ExpandedCategory => ({
      ...record,
      items:
        record.expand?.[CATEGORY_ITEM_EXPAND_KEY]?.map(expandItems).sort(
          (a: ExpandedCategoryItem, b: ExpandedCategoryItem) =>
            a.sort_order - b.sort_order
        ) ?? [],
    });

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
  create: () => {
    const currentLists = queryClient.getQueryData<ListsResponse[]>([
      Collections.Lists,
    ]);
    const maxSortOrder = Math.max(
      ...(currentLists?.map((list) => list.sort_order) ?? [0])
    );

    return pb.collection(Collections.Lists).create({
      user: pb.authStore.model?.id,
      sort_order: maxSortOrder + 1,
      weight_unit: "g",
    });
  },
  delete: (id: string) => {
    return pb.collection(Collections.Lists).delete(id);
  },
  update: (variables: { id: string; list: Partial<ListsResponse> }) => {
    return pb
      .collection(Collections.Lists)
      .update(variables.id, variables.list);
  },
  reorder: (listIds: string[]) =>
    Promise.all(
      listIds.map((id, index) =>
        pb.collection(Collections.Lists).update(id, { sort_order: index })
      )
    ),
};

export default listActions;
