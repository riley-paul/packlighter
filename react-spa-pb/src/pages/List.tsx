import React from "react";
import { useParams } from "react-router-dom";
import { ListHeader } from "@/components/ListHeader";
import { Category } from "@/components/Category";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Component: React.FC = () => {
  const { listId = "" } = useParams();
  const { queryList, createCategory } = useDataQuery(listId);

  if (queryList.isPending) return <div>Loading...</div>;
  if (queryList.isError) return <div>Error: {queryList.error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <ListHeader list={queryList.data} listId={listId} />
      {queryList.data.categories.map((c) => (
        <Category key={c.id} category={c} listId={listId} />
      ))}
      <div>
        <Button
          variant="link"
          size="sm"
          onClick={() => createCategory.mutate({})}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
    </div>
  );
};
