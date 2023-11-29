import React from "react";
import { ListHeader } from "@/components/ListHeader";
import { Category } from "@/components/Category";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/LoadingPage";
import {
  DndContext,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";

export const Component: React.FC = () => {
  const { queryList, createCategory, sortCategoryItems } = useDataQuery();

  if (queryList.isPending) return <LoadingPage />;
  if (queryList.isError) return <div>Error: {queryList.error.message}</div>;

  const handleDragStart = (event: DragStartEvent) => {
    console.log("drag started", event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    console.log("drag ended", event);
    const { active, over } = event;
    const { items }: { items: UniqueIdentifier[] } =
      active.data.current?.sortable;

    if (active.id !== over?.id && over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      sortCategoryItems.mutate(newItems);
    }
  };

  return (
    <Card className="flex-1 p-6 h-fit">
      <div className="flex flex-col gap-4">
        <ListHeader list={queryList.data} />
        <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver}>
          {queryList.data.categories.map((c) => (
            <Category key={c.id} category={c} list={queryList.data} />
          ))}
        </DndContext>
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
    </Card>
  );
};
