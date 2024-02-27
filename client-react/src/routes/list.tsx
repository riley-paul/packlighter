import { ListWithCategories, getList, updateList } from "@/api/list";
import ServerInput from "@/components/input/server-input";
import ListCategory from "@/components/list-category/list-category";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { cn } from "@/lib/utils";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    overflowY: "auto",
  },
});

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();
  const styles = useStyles();

  const listQuery = useQuery({
    queryKey: [Collections.Lists, listId],
    queryFn: ({ queryKey }) => getList(queryKey[1]),
  });

  const updateListMutation = useMutation({
    mutationFn: (data: Partial<ListWithCategories>) =>
      updateList({ id: listId, list: data }),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
      queryClient.invalidateQueries([Collections.Lists]);
    },
  });

  if (listQuery.isLoading) return <div>Loading...</div>;

  if (listQuery.isError || !listQuery.data) return <div>Error</div>;

  return (
    <div className="flex flex-col">
      <header className="h-12 border-b flex items-center px-1 justify-between">
        <h1 className={cn("text-lg font-bold flex-1")}>
          <ServerInput
            key={listQuery.data.id}
            currentValue={listQuery.data.name}
            placeholder="Unnamed List"
            className="text-lg font-bold w-full border-none bg-transparent shadow-none py-1 px-3 placeholder:italic"
            onUpdate={(v) => updateListMutation.mutate({ name: v })}
          />
        </h1>
      </header>
      <section className="overflow-y-auto flex-1">
        <div>{listQuery.data.name}</div>
        <div>{listQuery.data.description}</div>
        <div className={styles.categoryContainer}>
          {listQuery.data.categories.map((category) => (
            <ListCategory key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
