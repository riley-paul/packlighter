import { createCategory, updateCategoriesOrder } from "@/actions/category";
import {
  type ListWithCategories,
  getList,
  updateList,
  type ExpandedCategory,
} from "@/actions/list";
import AppHeader from "@/components/app-header";
import Error from "@/components/base/error";
import Loader from "@/components/base/loader";
import ServerInput from "@/components/input/server-input";
import ListSettings from "@/components/list-settings";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ServerTextarea from "@/components/input/server-textarea";
import ListCategory from "@/components/list-category/list-category";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();

  const [activeCategory, setActiveCategory] =
    React.useState<ExpandedCategory | null>(null);

  const listQuery = useQuery<ListWithCategories, Error>({
    queryKey: [Collections.Lists, listId],
    queryFn: ({ queryKey }) => getList(queryKey[1] as string),
    retry: false,
  });

  const updateListMutation = useMutation({
    mutationFn: (data: Partial<ListWithCategories>) =>
      updateList({ id: listId, list: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: () => createCategory(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
    },
  });

  const reorderCategoriesMutation = useMutation({
    mutationFn: (categories: ExpandedCategory[]) =>
      updateCategoriesOrder(categories.map((c) => c.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
    },
  });

  function handleDragStart(event: DragStartEvent) {
    if (!listQuery.isSuccess) return;
    const active = listQuery.data.categories.find(
      (c) => c.id === event.active.id
    );
    if (active) setActiveCategory(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCategory(null);
    if (active.id === over?.id || !listQuery.isSuccess) return;

    const oldIndex = listQuery.data.categories.findIndex(
      (i) => i.id === active.id
    );
    const newIndex = listQuery.data.categories.findIndex(
      (i) => i.id === over?.id
    );

    const newData = arrayMove(listQuery.data.categories, oldIndex, newIndex);
    reorderCategoriesMutation.mutate(newData);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={listQuery.data.categories}>
              {(reorderCategoriesMutation.isPending
                ? reorderCategoriesMutation.variables
                : listQuery.data.categories
              ).map((category) => (
                <ListCategory key={category.id} category={category} />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeCategory ? (
                <ListCategory category={activeCategory} isOverlay />
              ) : null}
            </DragOverlay>
          </DndContext>

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
