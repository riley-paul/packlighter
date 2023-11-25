import { pb } from "@/lib/pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RecordModel } from "pocketbase";

export const useCategories = (listId: string) => {
  const queryClient = useQueryClient();

  const queryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      pb
        .collection("categories")
        .getFullList({ filter: `list = "${listId}"`, sort: "-created" }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecordModel> }) =>
      pb.collection("categories").update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { queryCategories, updateCategory };
};
