import { updateCategoriesOrder } from "@/api/category";
import { ExpandedCategory, ListWithCategories } from "@/api/list";
import ListCategory from "@/components/list-category";
import Logo from "@/components/logo";
import PackingItems from "@/components/packing-items";
import PackingLists from "@/components/packing-lists";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { queryClient } from "@/lib/query";
import { useStore } from "@/lib/store";
import {
  CategoriesItemsResponse,
  Collections,
  ItemsResponse,
} from "@/lib/types";
import { cn } from "@/lib/utils";
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
import { Menu } from "lucide-react";
import React from "react";
import { useMutation } from "react-query";
import { Outlet, useParams } from "react-router-dom";

type ActiveDraggable =
  | {
      type: "category";
      data: ExpandedCategory;
    }
  | { type: "item"; data: ItemsResponse }
  | { type: "category-item"; data: CategoriesItemsResponse }
  | null;

export default function App(): ReturnType<React.FC> {
  const { isSidebarOpen, toggleSidebar } = useStore();
  const { listId } = useParams();

  const currentList = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

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
    if (!currentList) {
      console.log("No current list");
      return;
    }
    const active = currentList.categories.find((i) => i.id === event.active.id);
    if (active) setActiveDraggable({ type: "category", data: active });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDraggable(null);
    if (active.id === over?.id) return;

    if (!currentList) return;

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
        <aside
          className={cn(
            "border-r w-[300px] h-screen flex flex-col transition-all overflow-hidden",
            !isSidebarOpen && "w-0 border-none"
          )}
        >
          <header className="border-b h-14 flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "rounded-none h-14 w-14 transition-all flex-shrink-0 overflow-hidden"
              )}
              onClick={() => toggleSidebar()}
            >
              <Menu size="1.2rem" className="flex-shrink-0" />
            </Button>
            <Logo />
          </header>
          <ResizablePanelGroup autoSaveId="sidebar-panels" direction="vertical">
            <ResizablePanel defaultSize={40}>
              <PackingLists />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <PackingItems />
            </ResizablePanel>
          </ResizablePanelGroup>
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
        <DragOverlay dropAnimation={null}>
          {activeDraggable && activeDraggable.type === "category" && (
            <ListCategory category={activeDraggable.data} isOverlay />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
