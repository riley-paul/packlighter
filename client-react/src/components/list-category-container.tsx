import { ExpandedCategory, ListWithCategories } from "@/api/list";
import React from "react";
import ListCategory from "./list-category";

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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMutation } from "react-query";
import { updateCategoriesOrder } from "@/api/category";
import { useParams } from "react-router-dom";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";

interface Props {
  categories: ExpandedCategory[];
}

const ListCategoryContainer: React.FC<Props> = (props) => {
  const { categories } = props;
  const { listId } = useParams();

  const [activeCategory, setActiveCategory] =
    React.useState<ExpandedCategory | null>(null);

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const active = categories.find((i) => i.id === event.active.id);
    if (active) setActiveCategory(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCategory(null);
    if (active.id === over?.id) return;

    const oldIndex = categories.findIndex((i) => i.id === active.id);
    const newIndex = categories.findIndex((i) => i.id === over?.id);

    const newData = arrayMove(categories, oldIndex, newIndex);
    reorderCategoriesMutation.mutate(newData);
  }

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={categories}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((category) => (
            <ListCategory key={category.id} category={category} />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={null}>
          {activeCategory && (
            <ListCategory category={activeCategory} isOverlay />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ListCategoryContainer;
