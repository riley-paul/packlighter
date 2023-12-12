import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { queryClient } from "@/lib/query";

export const useItems = () =>
  createQuery<RecordModel[], ClientResponseError>({
    queryKey: ["items"],
    queryFn: () => pb.collection("items").getFullList({ sort: "-created" }),
  });

export const useUpdateItem = () =>
  createMutation({
    mutationFn: (item: RecordModel) =>
      pb.collection("items").update(item.id, item),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useDeleteItem = () =>
  createMutation({
    mutationFn: (item: RecordModel) => pb.collection("items").delete(item.id),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });
