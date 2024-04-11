import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import DeleteButton from "../base/delete-button";
import Gripper from "../base/gripper";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CacheKeys, queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerInput from "../input/server-input";
import ListCategoryItem from "./list-category-item";
import {
  formatWeight,
  getCategoryWeight,
  isCategoryFullyPacked,
} from "@/lib/helpers";
import { useDroppable } from "@dnd-kit/core";
import type { ExpandedCategory, List } from "@/db/schema";
import { trpc } from "@/client";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props {
  category: ExpandedCategory;
  list: List;
  isOverlay?: boolean;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category, isOverlay, list } = props;

  const { listId } = useParams();

  const {
    attributes,
    listeners,
    setNodeRef: sortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const { setNodeRef: droppableRef } = useDroppable({
    id: category.id,
    data: { type: "category", data: category },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: () => trpc.categories.delete.mutate(category.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
      toast.success(`${category.name || "Unnamed"} category deleted`);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: Partial<ExpandedCategory>) =>
      trpc.categories.update.mutate({ id: category.id, value: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
    },
  });

  const togglePackedMutation = useMutation({
    mutationFn: (value: boolean) =>
      trpc.categories.togglePacked.mutate({ id: category.id, value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
    },
  });

  const createItemMutation = useMutation({
    mutationFn: () =>
      trpc.categoriesItems.createEmpty.mutate({ categoryId: category.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Items] });
    },
  });

  return (
    <div
      key={category.id}
      ref={sortableRef}
      style={style}
      className={cn(
        "transition-all",
        isDragging && "opacity-30",
        isOverlay && "bg-card/70 border rounded"
      )}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4 px-1">
              <Gripper {...attributes} {...listeners} isGrabbing={isOverlay} />
            </TableHead>
            {list.showPacked && (
              <TableHead className="w-8">
                <Checkbox
                  checked={isCategoryFullyPacked(category)}
                  onCheckedChange={(checked) =>
                    togglePackedMutation.mutate(checked === true)
                  }
                />
              </TableHead>
            )}
            <TableHead
              colSpan={2 + (list.showImages ? 1 : 0)}
              className="text-foregound text-base font-semibold px-1"
            >
              <ServerInput
                className="text-base py-0.5"
                placeholder="Category Name"
                currentValue={category.name}
                onUpdate={(value) =>
                  updateCategoryMutation.mutate({ name: value })
                }
              />
            </TableHead>
            {list.showWeights && (
              <TableHead className="w-[7rem] text-center">Weight</TableHead>
            )}
            <TableHead className="w-[5rem]">Qty</TableHead>
            <TableHead className="w-6 pl-0">
              <DeleteButton
                handleDelete={() => deleteCategoryMutation.mutate()}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={droppableRef}>
          <SortableContext
            id="category-items"
            items={category.items}
            strategy={verticalListSortingStrategy}
          >
            {category.items.map((item) => (
              <ListCategoryItem list={list} key={item.id} item={item} />
            ))}
          </SortableContext>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={
                3 + (list.showPacked ? 1 : 0) + (list.showImages ? 1 : 0)
              }
            >
              <Button
                size="sm"
                variant="linkMuted"
                onClick={() => createItemMutation.mutate()}
              >
                <Plus size="1rem" className="mr-2" />
                Add Item
              </Button>
            </TableCell>
            {list?.showWeights && (
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <span>
                    {formatWeight(getCategoryWeight(category, list.weightUnit))}
                  </span>
                  <span className="min-w-8">{list.weightUnit}</span>
                </div>
              </TableCell>
            )}
            <TableCell>
              <div className="pl-2">
                {category.items.reduce((acc, val) => acc + val.quantity, 0)}
              </div>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ListCategory;
