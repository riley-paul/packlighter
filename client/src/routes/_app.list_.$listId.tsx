import { createFileRoute } from "@tanstack/react-router";
import type { ListWithCategories } from "@/actions/list";
import AppHeader from "@/components/app-header";
import Error from "@/components/base/error";
import Loader from "@/components/base/loader";
import ServerInput from "@/components/input/server-input";
import ListSettings from "@/components/list-settings";
import { Button } from "@/components/ui/button";
import { Collections } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServerTextarea from "@/components/input/server-textarea";
import ListCategory from "@/components/list-category/list-category";
import actions from "@/actions";
import useListId from "@/hooks/useListId";

function ListPage(): ReturnType<React.FC> {
  const listId = useListId();
  const queryClient = useQueryClient();

  const listQuery = useQuery<ListWithCategories, Error>({
    queryKey: [Collections.Lists, listId],
    queryFn: () => actions.lists.getById(listId),
    retry: false,
  });

  const updateListMutation = useMutation({
    mutationFn: (data: Partial<ListWithCategories>) =>
      actions.lists.update({ id: listId, list: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: () => actions.categories.create(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
    },
  });

  if (listQuery.isLoading)
    return (
      <div className="h-full">
        <AppHeader />
        <Loader />
      </div>
    );

  if (listQuery.isError || !listQuery.data)
    return (
      <div className="h-full">
        <AppHeader />
        <Error error={listQuery.error} showGoHome />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <AppHeader>
        <h1 className={cn("text-lg font-bold flex-1")}>
          <ServerInput
            key={listQuery.data.id}
            currentValue={listQuery.data.name}
            placeholder="Unnamed List"
            className="text-lg font-bold w-full border-none bg-transparent shadow-none placeholder:italic"
            onUpdate={(v) => updateListMutation.mutate({ name: v })}
          />
        </h1>
        <ListSettings list={listQuery.data} />
      </AppHeader>
      <section className="overflow-y-auto flex-1">
        <div className="p-4 flex flex-col gap-4">
          <ServerTextarea
            key={listQuery.data.id}
            className="bg-card"
            placeholder="List Description"
            currentValue={listQuery.data.description}
            onUpdate={(v) => updateListMutation.mutate({ description: v })}
          />

          {listQuery.data.categories.map((category) => (
            <ListCategory key={category.id} category={category} />
          ))}

          <Button
            variant="linkMuted"
            size="sm"
            className="w-min ml-2"
            onClick={() => createCategoryMutation.mutate()}
          >
            <Plus size="1rem" className="mr-2" />
            Add Category
          </Button>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/_app/list/$listId")({
  component: ListPage,
});
