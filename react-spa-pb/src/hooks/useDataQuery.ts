import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

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
          a.sort_order - b.sort_order
      ) ?? [],
});

export type ListWithCategories = RecordModel & {
  categories: ExpandedCategory[];
};

export const useDataQuery = () => {
  const { listId = "" } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const queryLists = useQuery({
    queryKey: ["lists"],
    queryFn: () =>
      pb
        .collection("lists")
        .getFullList({ sort: "-created", requestKey: null }),
  });

  const queryList = useQuery({
    queryKey: ["list", listId],
    queryFn: async ({ queryKey }): Promise<ListWithCategories> => {
      const [list, categories] = await Promise.all([
        pb.collection("lists").getOne(queryKey[1] ?? "", { requestKey: null }),
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

  const queryItems = useQuery({
    queryKey: ["items"],
    queryFn: () => pb.collection("items").getFullList({ sort: "created" }),
  });

  const createList = useMutation({
    mutationFn: (list: Partial<RecordModel>) =>
      pb.collection("lists").create({ ...list, user: pb.authStore.model?.id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      navigate(`/${data.id}`);
    },
  });

  const updateList = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecordModel> }) =>
      pb.collection("lists").update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["list", data.id] });
    },
  });

  const deleteList = useMutation({
    mutationFn: (listId: string) => pb.collection("lists").delete(listId),
    onSuccess: (_, deletedList) => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      if (listId === deletedList) navigate(`/`);
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecordModel> }) =>
      pb.collection("list_categories").update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (categoryId: string) =>
      pb.collection("list_categories").delete(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const createCategory = useMutation({
    mutationFn: (category: Partial<RecordModel>) =>
      pb.collection("list_categories").create({ ...category, list: listId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const updateCategoryItem = useMutation({
    mutationFn: (input: {
      id: string;
      itemId?: string;
      data: Partial<ExpandedCategoryItem>;
    }) =>
      Promise.all([
        pb.collection("categories_items").update(input.id, input.data),
        input.itemId
          ? pb.collection("items").update(input.itemId, input.data.itemData)
          : null,
      ]),
    onSuccess: (_, { itemId }) => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      if (itemId) queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const addItemToCategory = useMutation({
    mutationFn: (data: { category: string; item: string }) =>
      pb
        .collection("categories_items")
        .create({ ...data, quantity: 1, sort_order: 999999 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const createCategoryItem = useMutation({
    mutationFn: (categoryId: string) =>
      pb
        .collection("items")
        .create({ user: pb.authStore.model?.id })
        .then((item) =>
          pb.collection("categories_items").create({
            category: categoryId,
            item: item.id,
            quantity: 1,
            sort_order: 999999,
          })
        ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteCategoryItem = useMutation({
    mutationFn: (id: string) => pb.collection("categories_items").delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const updateItem = useMutation({
    mutationFn: (input: { id: string; data: Partial<RecordModel> }) =>
      pb.collection("items").update(input.id, input.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: (id: string) => pb.collection("items").delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const packCategoryItems = useMutation({
    mutationFn: (data: { category: ExpandedCategory; packed: boolean }) => {
      const { category, packed } = data;
      return Promise.all(
        category.items.map((i) =>
          pb.collection("categories_items").update(i.id, { packed })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const packListItems = useMutation({
    mutationFn: (data: { list: ListWithCategories; packed: boolean }) => {
      const { list, packed } = data;
      const itemIds = list.categories.flatMap((c) => c.items.map((i) => i.id));
      return Promise.all(
        itemIds.map((i) =>
          pb.collection("categories_items").update(i, { packed })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  const sortCategoryItems = useMutation({
    mutationFn: (variables: {
      items: ExpandedCategoryItem[];
      categoryId: string;
    }) => {
      const { items } = variables;
      return Promise.all(
        items.map((i, index) =>
          pb.collection("categories_items").update(i.id, { sort_order: index })
        )
      );
    },
    onMutate: async (variables) => {
      const { items, categoryId } = variables;
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["list", listId] });

      // Snapshot the previous value
      const previousList = queryClient.getQueryData<ListWithCategories>([
        "list",
        listId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<ListWithCategories>(["list", listId], (prev) =>
        prev
          ? {
              ...prev,
              categories: prev?.categories.map((c) =>
                c.id === categoryId ? { ...c, items } : c
              ),
            }
          : undefined
      );

      // Return a context object with the snapshotted value
      return { previousList };
    },
    onError: (err, _, context) => {
      // Rollback to the previous value
      console.log("could not update order", err);
      queryClient.setQueryData<ListWithCategories>(
        ["list", listId],
        context?.previousList
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
    },
  });

  return {
    queryClient,
    queryLists,
    queryList,
    queryItems,
    createList,
    updateList,
    deleteList,
    updateCategory,
    deleteCategory,
    createCategory,
    addItemToCategory,
    createCategoryItem,
    updateCategoryItem,
    deleteCategoryItem,
    updateItem,
    deleteItem,
    packCategoryItems,
    packListItems,
    sortCategoryItems,
  };
};
