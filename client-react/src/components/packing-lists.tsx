import { createList, getLists, updateListsOrder } from "@/api/list";
import { queryClient } from "@/lib/query";
import { Collections, ListsResponse } from "@/lib/types";
import { Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import PackingList from "./packing-list";
import Loader from "./base/loader";
import Error from "./base/error";

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
import { cn } from "@/lib/utils";

export default function PackingLists(): ReturnType<React.FC> {
  const navigate = useNavigate();

  const [activeList, setActiveList] = React.useState<ListsResponse | null>(
    null
  );

  const listsQuery = useQuery<ListsResponse[], Error>({
    queryKey: [Collections.Lists],
    queryFn: getLists,
  });

  const newListMutation = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      queryClient.invalidateQueries(Collections.Lists);
      navigate(`/list/${data.id}`);
    },
  });

  const reorderListsMutation = useMutation({
    mutationFn: (lists: ListsResponse[]) =>
      updateListsOrder(lists.map((i) => i.id)),
    onMutate: async (newLists) => {
      await queryClient.cancelQueries({ queryKey: [Collections.Lists] });
      const previousLists = queryClient.getQueryData([Collections.Lists]);
      queryClient.setQueryData([Collections.Lists], newLists);
      return { previousLists };
    },
    onError: (_, __, context) => {
      if (context?.previousLists)
        queryClient.setQueryData([Collections.Lists], context.previousLists);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists]);
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    if (!listsQuery.isSuccess) return;
    const active = listsQuery.data.find((i) => i.id === event.active.id);
    if (active) setActiveList(active);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveList(null);
    if (active.id === over?.id || !listsQuery.isSuccess) return;

    const oldIndex = listsQuery.data.findIndex((i) => i.id === active.id);
    const newIndex = listsQuery.data.findIndex((i) => i.id === over?.id);

    const newData = arrayMove(listsQuery.data, oldIndex, newIndex);
    reorderListsMutation.mutate(newData);
  }

  return (
    <div className="flex flex-col h-[40vh] gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-sm">Lists</span>
        <Button
          size="sm"
          variant="linkMuted"
          onClick={() => newListMutation.mutate()}
        >
          <Plus size="1rem" className="mr-2" />
          Add List
        </Button>
      </header>
      <Card
        className={cn(
          "py-2 h-full overflow-y-auto overflow-x-hidden transition-colors rounded-md",
          activeList && "border-primary"
        )}
      >
        {listsQuery.isLoading && <Loader />}
        {listsQuery.isError && <Error message={listsQuery.error?.message} />}
        {listsQuery.isSuccess && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext
              items={listsQuery.data}
              strategy={verticalListSortingStrategy}
            >
              {listsQuery.data?.map((list) => (
                <PackingList key={list.id} list={list} />
              ))}
            </SortableContext>
            <DragOverlay dropAnimation={null}>
              {activeList && <PackingList list={activeList} isOverlay />}
            </DragOverlay>
          </DndContext>
        )}
      </Card>
    </div>
  );
}
