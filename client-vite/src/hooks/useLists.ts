import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";

export const useLists = (listId?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const queryLists = useQuery({
    queryKey: ["lists"],
    queryFn: () => pb.collection("lists").getFullList({ sort: "-created" }),
  });

  const queryList = useQuery({
    queryKey: ["list", listId],
    queryFn: ({ queryKey }) => pb.collection("lists").getOne(queryKey[1] ?? ""),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      navigate(`/`);
    },
  });

  return {
    queryClient,
    queryLists,
    queryList,
    createList,
    updateList,
    deleteList,
  };
};
