import { ListWithCategories, getList, updateList } from "@/api/list";
import AppHeader from "@/components/app-header";
import Error from "@/components/base/error";
import Loader from "@/components/base/loader";
import ServerInput from "@/components/input/server-input";
import ListCategoryContainer from "@/components/list-category-container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();

  const listQuery = useQuery<ListWithCategories, Error>({
    queryKey: [Collections.Lists, listId],
    queryFn: ({ queryKey }) => getList(queryKey[1] as string),
  });

  const updateListMutation = useMutation({
    mutationFn: (data: Partial<ListWithCategories>) =>
      updateList({ id: listId, list: data }),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
      queryClient.invalidateQueries([Collections.Lists]);
    },
  });

  if (listQuery.isLoading)
    return (
      <div className="h-screen">
        <AppHeader />
        <Loader />
      </div>
    );

  if (listQuery.isError || !listQuery.data)
    return <Error message={listQuery.error?.message} />;

  return (
    <div className="flex flex-col h-screen">
      <AppHeader>
        <h1 className={cn("text-lg font-bold flex-1")}>
          <ServerInput
            key={listQuery.data.id}
            currentValue={listQuery.data.name}
            placeholder="Unnamed List"
            className="text-lg font-bold w-full border-none bg-transparent shadow-none py-1 px-3 placeholder:italic"
            onUpdate={(v) => updateListMutation.mutate({ name: v })}
          />
        </h1>
      </AppHeader>
      <section className="overflow-y-auto flex-1">
        <div className="p-4 flex flex-col gap-4">
          <Textarea className="bg-card">{listQuery.data.description}</Textarea>
          <ListCategoryContainer categories={listQuery.data.categories} />
          <Button variant="linkMuted" size="sm" className="w-min ml-2">
            <Plus size="1rem" className="mr-2" />
            Add Category
          </Button>
        </div>
      </section>
    </div>
  );
}
