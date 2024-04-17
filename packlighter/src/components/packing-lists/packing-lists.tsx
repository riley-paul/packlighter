"use client";

import { Plus } from "lucide-react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import PackingList from "./packing-list";
import Loader from "../base/loader";
import Error from "../base/error";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
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
import { api } from "@/trpc/react";
import type { List } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import { getQueryKey } from "@trpc/react-query";

export default function PackingLists(): ReturnType<React.FC> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeList, setActiveList] = React.useState<List | null>(null);

  const listsQuery = api.list.get.useQuery();

  const newListMutation = api.list.create.useMutation({
    onSuccess: async (data) => {
      const queryKey = getQueryKey(api.list.get);
      await queryClient.invalidateQueries({ queryKey });
      router.push(getPaths.list(data.id));
    },
  });

  const reorderListsMutation = api.list.reorder.useMutation({
    onMutate: async (newLists) => {
      const queryKey = getQueryKey(api.list.get);
      await queryClient.cancelQueries({ queryKey });

      const previousLists = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newLists);

      return { previousLists };
    },
    onError: (_, __, context) => {
      const queryKey = getQueryKey(api.list.get);
      if (context?.previousLists)
        queryClient.setQueryData(queryKey, context.previousLists);
    },
    onSuccess: async () => {
      const queryKey = getQueryKey(api.list.get);
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor),
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
    reorderListsMutation.mutate(newData.map((i) => i.id));
  }

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="text-sm font-semibold">Lists</span>
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
          "h-full overflow-y-auto overflow-x-hidden py-2 transition-colors",
          activeList && "border-primary",
        )}
      >
        {listsQuery.isLoading && <Loader />}
        {listsQuery.isError && <Error small error={listsQuery.error} />}
        {listsQuery.isSuccess && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext
              id="packing-lists"
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
        {listsQuery.isSuccess && listsQuery.data.length === 0 && (
          <Placeholder message="No lists yet" />
        )}
      </Card>
    </div>
  );
}
