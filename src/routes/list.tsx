import AppHeader from "@/components/app-header";
import ErrorReport from "@/components/base/error";
import ServerInput from "@/components/input/server-input";
import ListSettings from "@/components/list-settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import ServerTextarea from "@/components/input/server-textarea";
import ListCategory from "@/components/list-category/list-category";
import useAppStore from "@/store";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Category } from "@/store/schema";

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();

  const { listGet, listUpdate, categoryCreate, categoryReorder } =
    useAppStore();
  const list = listGet(listId);

  const [activeCategory, setActiveCategory] = React.useState<Category | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  if (!list) {
    const error = new Error("List not found");
    return (
      <div className="h-full">
        <AppHeader />
        <ErrorReport error={error} showGoHome />
      </div>
    );
  }

  function handleDragStart(event: DragStartEvent) {
    if (!list) return;
    const active = list?.categories.find((i) => i.id === event.active.id);
    if (active) setActiveCategory(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCategory(null);
    if (!list) return;
    if (active.id === over?.id) return;

    const oldIndex = list.categories.findIndex((i) => i.id === active.id);
    const newIndex = list.categories.findIndex((i) => i.id === over?.id);

    const newData = arrayMove(list.categories, oldIndex, newIndex);
    categoryReorder(listId, newData);
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader>
        <h1 className={cn("text-lg font-bold flex-1")}>
          <ServerInput
            key={list.id}
            currentValue={list.name}
            placeholder="Unnamed List"
            className="text-lg font-bold w-full border-none bg-transparent shadow-none placeholder:italic"
            onUpdate={(v) => listUpdate(list.id, { name: v })}
          />
        </h1>
        <ListSettings list={list} />
      </AppHeader>
      <section className="overflow-y-auto flex-1">
        <div className="p-4 flex flex-col gap-4">
          <ServerTextarea
            key={list.id}
            className="bg-card"
            placeholder="List Description"
            currentValue={list.description}
            onUpdate={(v) => listUpdate(list.id, { description: v })}
          />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext
              id="categories"
              items={list.categories}
              strategy={verticalListSortingStrategy}
            >
              {list.categories.map((category) => (
                <ListCategory
                  key={category.id}
                  category={category}
                  list={list}
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeCategory && (
                <ListCategory category={activeCategory} list={list} isOverlay />
              )}
            </DragOverlay>
          </DndContext>
          <Button
            variant="linkMuted"
            size="sm"
            className="w-min ml-2"
            onClick={() => categoryCreate(list.id)}
          >
            <Plus size="1rem" className="mr-2" />
            Add Category
          </Button>
        </div>
      </section>
    </div>
  );
}
