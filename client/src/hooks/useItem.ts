import { pb } from "@/lib/pocketbase";
import { currentList } from "@/lib/store";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { queryClient } from "@/lib/query";
import { Collections, type ItemsRecord } from "@/lib/types";

export const useItems = () =>
  createQuery<RecordModel[], ClientResponseError>({
    queryKey: ["items"],
    queryFn: () =>
      pb.collection(Collections.Items).getFullList({ sort: "-created" }),
  });

export const useUpdateItem = () =>
  createMutation({
    mutationFn: (variables: { id: string; item: Partial<ItemsRecord> }) =>
      pb.collection(Collections.Items).update(variables.id, variables.item),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });

export const useDeleteItem = () =>
  createMutation({
    mutationFn: (id: string) => pb.collection(Collections.Items).delete(id),
    onSuccess: () =>
      currentList.subscribe((listId) => {
        queryClient.invalidateQueries({ queryKey: ["list", listId] });
        queryClient.invalidateQueries({ queryKey: ["items"] });
      }),
  });
