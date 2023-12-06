import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import {
  createMutation,
  createQuery,
  type QueryClient,
} from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";

export const useItems = () =>
  createQuery<RecordModel[], ClientResponseError>({
    queryKey: ["items"],
    queryFn: () => pb.collection("items").getFullList({ sort: "-created" }),
  });

export const useUpdateItem = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (item: RecordModel) =>
      pb.collection("items").update(item.id, item),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useDeleteItem = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (item: RecordModel) => pb.collection("items").delete(item.id),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });
