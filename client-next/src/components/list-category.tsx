import { ExpandedCategory, ListWithCategories } from "@/api/list";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import DeleteButton from "./base/delete-button";
import Gripper from "./base/gripper";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  deleteCategory,
  toggleCategoryPacked,
  updateCategory,
} from "@/api/category";
import { Collections, ListsWeightUnitOptions } from "@/lib/types";
import { queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerInput from "./input/server-input";
import ListCategoryItem from "./list-category-item";
import {
  formatWeight,
  getCategoryWeight,
  isCategoryFullyPacked,
} from "@/lib/helpers";
import { createCategoryItem } from "@/api/categoryItem";
import { useDroppable } from "@dnd-kit/core";
import { ActiveDraggable } from "./app-dnd-wrapper";

interface Props {
  category: ExpandedCategory;
  isOverlay?: boolean;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category, isOverlay } = props;

  const { listId } = useParams();

  const list = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

  const sortableData: ActiveDraggable = {
    type: "category",
    data: category,
  };

  const {
    attributes,
    listeners,
    setNodeRef: sortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
    data: sortableData,
  });

  const { setNodeRef: droppableRef } = useDroppable({
    id: category.id,
    data: { type: "category", data: category },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      toast.success(`${category.name || "Unnamed"} category deleted`);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: Partial<ExpandedCategory>) =>
      updateCategory({ id: category.id, category: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
    },
  });

  const addCategoryItemMutation = useMutation({
    mutationFn: () => createCategoryItem({ category, listId: listId ?? "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [Collections.Items] });
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: () => toggleCategoryPacked(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
    },
  });

  return (
    <div
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
            {list?.show_packed && (
              <TableHead className="w-8">
                <Checkbox
                  checked={isCategoryFullyPacked(category)}
                  onCheckedChange={() => toggleCompletionMutation.mutate()}
                />
              </TableHead>
            )}
            <TableHead
              colSpan={2 + (list?.show_images ? 1 : 0)}
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
            {list?.show_weights && (
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
              <ListCategoryItem key={item.id} item={item} />
            ))}
          </SortableContext>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={
                3 + (list?.show_packed ? 1 : 0) + (list?.show_images ? 1 : 0)
              }
            >
              <Button
                variant="linkMuted"
                size="sm"
                onClick={() => addCategoryItemMutation.mutate()}
              >
                <Plus size="1rem" className="mr-2" />
                Add Item
              </Button>
            </TableCell>
            {list?.show_weights && (
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <span>
                    {formatWeight(
                      getCategoryWeight(
                        category,
                        list?.weight_unit ?? ListsWeightUnitOptions.g
                      )
                    )}
                  </span>
                  <span className="min-w-8">
                    {list?.weight_unit ?? ListsWeightUnitOptions.g}
                  </span>
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
