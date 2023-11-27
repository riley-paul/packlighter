import React from "react";
import { ListHeader } from "@/components/ListHeader";
import { Category } from "@/components/Category";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListName } from "@/components/ListName";
import { AccountDropdown } from "@/components/AccountDropdown";
import { LoadingPage } from "@/components/LoadingPage";
import { ListSettings } from "@/components/ListSettings";

export const Component: React.FC = () => {
  const { queryList, createCategory } = useDataQuery();

  if (queryList.isPending) return <LoadingPage />;
  if (queryList.isError) return <div>Error: {queryList.error.message}</div>;

  return (
    <>
      <header className="bg-card text-foreground h-14 border-b flex gap-2 justify-between p-4 items-center">
        <ListName listName={queryList.data.name} />
        <ListSettings list={queryList.data} />
        <AccountDropdown />
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-4">
          <ListHeader list={queryList.data} />
          {queryList.data.categories.map((c) => (
            <Category key={c.id} category={c} list={queryList.data} />
          ))}
          <div>
            <Button
              variant="linkMuted"
              size="sm"
              onClick={() => createCategory.mutate({})}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
