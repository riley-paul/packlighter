import { pb } from "@/lib/pocketbase";
import { createMutation, type QueryClient } from "@tanstack/svelte-query";
import type { RecordModel } from "pocketbase";

export const useUpdateItem = (queryClient: QueryClient, listId: string) =>
  createMutation({
    mutationFn: (item: RecordModel) =>
      pb.collection("items").update(item.id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
