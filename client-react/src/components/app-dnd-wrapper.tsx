import { updateCategoriesOrder } from "@/api/category";
import {
  ExpandedCategory,
  ExpandedCategoryItem,
  ListWithCategories,
} from "@/api/list";
import ListCategory from "@/components/list-category";
import { queryClient } from "@/lib/query";
import { Collections, ItemsResponse } from "@/lib/types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import ListCategoryItem from "./list-category-item";
import { updateCategoryItemsOrder } from "@/api/categoryItem";
import PackingItem from "./packing-item";

type ActiveDraggable =
  | {
      type: "category";
      data: ExpandedCategory;
    }
  | { type: "item"; data: ItemsResponse }
  | { type: "category-item"; data: ExpandedCategoryItem }
  | null;

const AppDndWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { listId } = useParams();

  const [activeDraggable, setActiveDraggable] =
    React.useState<ActiveDraggable>(null);

  const reorderCategoriesMutation = useMutation({
    mutationFn: (categories: ExpandedCategory[]) =>
      updateCategoriesOrder(categories.map((i) => i.id)),
    onMutate: async (newCategories) => {
      await queryClient.cancelQueries({
        queryKey: [Collections.Lists, listId],
      });

      const previousList: ListWithCategories | undefined =
        queryClient.getQueryData([Collections.Lists, listId]);

      queryClient.setQueryData([Collections.Lists, listId], {
        ...previousList,
        categories: newCategories,
      });
      return { previousList };
    },
    onError: (_, __, context) => {
      if (context?.previousList)
        queryClient.setQueryData(
          [Collections.Lists, listId],
          context.previousList
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  const reorderCategoryItemsMutation = useMutation({
    mutationFn: updateCategoryItemsOrder,
  });

  function handleDragStart(event: DragStartEvent) {
    const currentList = queryClient.getQueryData<ListWithCategories>([
      Collections.Lists,
      listId,
    ]);
    if (!currentList) return;

    setActiveDraggable(event.active.data.current as ActiveDraggable);
    if (event.active.data.current?.type === "category") {
      console.log("category drag start");
    }

    if (event.active.data.current?.type === "category-item") {
      setActiveDraggable(event.active.data.current as ActiveDraggable);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const currentList = queryClient.getQueryData<ListWithCategories>([
      Collections.Lists,
      listId,
    ]);
    if (!currentList) return;

    const { active, over } = event;
    if (active.id === over?.id) return;

    if (event.active.data.current?.type === "category") {
      const oldIndex = currentList.categories.findIndex(
        (i) => i.id === active.id
      );
      const newIndex = currentList.categories.findIndex(
        (i) => i.id === over?.id
      );

      const newData = arrayMove(currentList.categories, oldIndex, newIndex);
      reorderCategoriesMutation.mutate(newData);
    }
    setActiveDraggable(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="flex w-full h-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        <DragOverlay dropAnimation={null}>
          {activeDraggable && activeDraggable.type === "category" && (
            <ListCategory category={activeDraggable.data} isOverlay />
          )}
          {activeDraggable && activeDraggable.type === "category-item" && (
            <ListCategoryItem item={activeDraggable.data} isOverlay />
          )}
          {activeDraggable && activeDraggable.type === "item" && (
            <PackingItem item={activeDraggable.data} isOverlay />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default AppDndWrapper;
