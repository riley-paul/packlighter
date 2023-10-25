import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grabber } from "./Grabber";
import { Separator } from "./ui/separator";

interface ILink {
  name: string;
  link: string;
  class?: string;
}

interface ILinkItemProps<T> {
  id: string;
  item: T;
  createLink: (item: T) => ILink;
  isOverlay?: boolean;
  isHidden?: boolean;
}

function LinkItem<T>({
  item,
  createLink,
  isOverlay,
  isHidden,
  ...props
}: ILinkItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const link = createLink(item);

  return (
    <li
      className={cn(
        "grid grid-cols-[auto_1fr] items-center gap-2 py-2",
        isOverlay && "border-y bg-card",
        isHidden && "opacity-0"
      )}
      ref={setNodeRef}
      style={style}
    >
      <Grabber attributes={attributes} listeners={listeners} />
      <a
        className={cn({ "opacity-50": !link.name }, link.class)}
        href={link.link}
      >
        <div className="text-sm flex w-full justify-between items-center">
          {link.name}
          <ChevronRight className="text-muted-foreground" />
        </div>
      </a>
    </li>
  );
}

interface IProps<T> {
  items: T[];
  setItems: (items: T[]) => void;
  createLink: (item: T) => ILink;
}

export function LinkList<T extends { id: string }>({
  items,
  setItems,
  createLink,
}: IProps<T>) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
    setIsDragging(false);
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
    >
      <ul className="grid border rounded-md px-2 bg-background">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <>
              {idx > 0 && <Separator />}
              <LinkItem
                id={item.id}
                key={item.id}
                item={item}
                createLink={createLink}
                isHidden={activeId === item.id && isDragging}
              />
            </>
          ))}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <LinkItem
              id={activeId}
              item={items.find((item) => item.id === activeId)!}
              createLink={createLink}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </ul>
    </DndContext>
  );
}
