import React from "react";
import { ListHeader } from "@/components/ListHeader";
import { Category } from "@/components/Category";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/LoadingPage";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";

export const Component: React.FC = () => {
  const { queryList, createCategory, sortCategoryItems } = useDataQuery();

  if (queryList.isPending) return <LoadingPage />;
  if (queryList.isError) return <div>Error: {queryList.error.message}</div>;

  const handleDragStart = (event: DragStartEvent) => {
    console.log("drag started", event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("drag ended", event);
    const { active, over } = event;
    console.log(active, over);

    if (!over) return;

    const activeContainerId = active.data.current?.sortable.containerId;
    const overContainerId = over.data.current?.sortable.containerId;

    if (activeContainerId === overContainerId) {
      console.log("same container");
      const items = queryList.data.categories.find(
        (c) => c.id === activeContainerId
      )?.items;

      if (!items) return;

      if (active.id !== over?.id && over?.id) {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        sortCategoryItems.mutate({
          items: newItems,
          categoryId: activeContainerId,
        });
      }
    }
  };

  return (
    <Card className="flex-1 p-6 h-fit">
      <div className="flex flex-col gap-4">
        <ListHeader list={queryList.data} />
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {queryList.data.categories.map((c) => (
            <Category
              key={c.id}
              category={c}
              list={queryList.data}
              sortDisabled={sortCategoryItems.isPending}
            />
          ))}
        </DndContext>
        <div>
          <Button
            variant="linkMuted"
            size="sm"
            onClick={() => createCategory.mutate({})}
            disabled={createCategory.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
    </Card>
  );
};
