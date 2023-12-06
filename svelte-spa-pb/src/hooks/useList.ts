import { pb } from "@/lib/pocketbase";
import {
  QueryClient,
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/svelte-query";
import type { ClientResponseError, RecordModel } from "pocketbase";
import { link, push as goto } from "svelte-spa-router";
import type { Readable } from "svelte/store";

export const useList = (listId: string) =>
  createQuery<RecordModel, ClientResponseError>({
    queryKey: ["list", listId],
    queryFn: () => pb.collection("lists").getOne(listId),
  });

export const useLists = () =>
  createQuery<RecordModel[], ClientResponseError>({
    queryKey: ["lists"],
    queryFn: () => pb.collection("lists").getFullList({ sort: "-created" }),
  });

export const useCreateList = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: () =>
      pb.collection("lists").create({ user: pb.authStore.model?.id }),
    onSuccess: (data) => {
      goto(`/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

export const useRemoveList = (queryClient: QueryClient, location: string) =>
  createMutation({
    mutationFn: (id: string) => pb.collection("lists").delete(id),
    onSuccess: (data, variables) => {
      if (location.includes(variables)) goto("/");
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

export const useUpdateList = (queryClient: QueryClient) =>
  createMutation({
    mutationFn: (list: RecordModel) =>
      pb.collection("lists").update(list.id, list),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["list", data.id] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
