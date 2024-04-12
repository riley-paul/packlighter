import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import PackingList from "./packing-list";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn, getPaths } from "@/lib/utils";
import Placeholder from "../base/placeholder";
import useAppStore from "@/store";
import { List } from "@/store/schema";

export default function PackingLists(): ReturnType<React.FC> {
  const navigate = useNavigate();
  const { lists, listCreate, listReorder } = useAppStore();

  const [activeList, setActiveList] = React.useState<List | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  function handleDragStart(event: DragStartEvent) {
    const active = lists.find((i) => i.id === event.active.id);
    if (active) setActiveList(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveList(null);
    if (active.id === over?.id) return;

    const oldIndex = lists.findIndex((i) => i.id === active.id);
    const newIndex = lists.findIndex((i) => i.id === over?.id);

    const newData = arrayMove(lists, oldIndex, newIndex);
    listReorder(newData);
  }

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-sm">Lists</span>
        <Button
          size="sm"
          variant="linkMuted"
          onClick={() => {
            const list = listCreate();
            navigate(getPaths.list(list.id));
          }}
        >
          <Plus size="1rem" className="mr-2" />
          Add List
        </Button>
      </header>
      <Card
        className={cn(
          "py-2 h-full overflow-y-auto overflow-x-hidden transition-colors",
          activeList && "border-primary"
        )}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            id="packing-lists"
            items={lists}
            strategy={verticalListSortingStrategy}
          >
            {lists.map((list) => (
              <PackingList key={list.id} list={list} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeList && <PackingList list={activeList} isOverlay />}
          </DragOverlay>
        </DndContext>

        {lists.length === 0 && <Placeholder message="No lists yet" />}
      </Card>
    </div>
  );
}
