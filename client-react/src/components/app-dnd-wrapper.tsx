import { updateCategoriesOrder } from "@/api/category";
import { ExpandedCategory, ListWithCategories } from "@/api/list";
import ListCategory from "@/components/list-category";
import { queryClient } from "@/lib/query";
import {
  CategoriesItemsResponse,
  Collections,
  ItemsResponse,
} from "@/lib/types";
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

type ActiveDraggable =
  | {
      type: "category";
      data: ExpandedCategory;
    }
  | { type: "item"; data: ItemsResponse }
  | { type: "category-item"; data: CategoriesItemsResponse }
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

  function handleDragStart(event: DragStartEvent) {
    const currentList = queryClient.getQueryData<ListWithCategories>([
      Collections.Lists,
      listId,
    ]);
    if (!currentList) {
      console.log("No current list");
      return;
    }
    const active = currentList.categories.find((i) => i.id === event.active.id);
    if (active) setActiveDraggable({ type: "category", data: active });
  }

  function handleDragEnd(event: DragEndEvent) {
    const currentList = queryClient.getQueryData<ListWithCategories>([
      Collections.Lists,
      listId,
    ]);
    if (!currentList) return;
    const { active, over } = event;
    setActiveDraggable(null);
    if (active.id === over?.id) return;

    const oldIndex = currentList.categories.findIndex(
      (i) => i.id === active.id
    );
    const newIndex = currentList.categories.findIndex((i) => i.id === over?.id);

    const newData = arrayMove(currentList.categories, oldIndex, newIndex);
    reorderCategoriesMutation.mutate(newData);
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
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default AppDndWrapper;
