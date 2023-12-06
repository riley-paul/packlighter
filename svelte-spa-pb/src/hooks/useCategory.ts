import { pb } from "@/lib/pocketbase";
import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { RecordModel } from "pocketbase";

export const useUpdateCategory = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (category: RecordModel) =>
      pb.collection("list_categories").update(category.id, category),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["list", variables.list] });
    },
  });

export const useDeleteCategory = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (category: RecordModel) =>
      pb.collection("list_categories").delete(category.id),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["list", variables.list] });
    },
  });

export const useCreateCategory = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (listId: string) =>
      pb.collection("list_categories").create({ list: listId }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["list", variables] });
    },
  });
