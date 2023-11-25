import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

type ExpandedItem = RecordModel & { itemData: RecordModel };
const expandItems = (record: RecordModel): ExpandedItem => ({
  ...record,
  itemData: record.expand?.item ?? {},
});

export type ExpandedCategory = RecordModel & { items: ExpandedItem[] };
const expandCategories = (record: RecordModel): ExpandedCategory => ({
  ...record,
  items: record.expand?.["categories_items(category)"]?.map(expandItems) ?? [],
});

export type ListWithCategories = RecordModel & {
  categories: ExpandedCategory[];
};

export const useDataQuery = (listId?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();

  const queryLists = useQuery({
    queryKey: ["lists"],
    queryFn: () => pb.collection("lists").getFullList({ sort: "-created" }),
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
          .then((data) => data.map(expandCategories)),
      ]);
      return { ...list, categories };
    },
  });

  const createList = useMutation({
    mutationFn: (list: Partial<RecordModel>) =>
      pb.collection("lists").create(list),
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
      if (params.listId === deletedList) navigate(`/`);
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

  return {
    queryClient,
    queryLists,
    queryList,
    createList,
    updateList,
    deleteList,
    updateCategory,
    deleteCategory,
    createCategory,
  };
};
