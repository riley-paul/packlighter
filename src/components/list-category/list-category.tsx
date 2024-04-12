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
import { Collections, ListsWeightUnitOptions } from "@/lib/types";
import { queryClient } from "@/lib/query";
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
import AddItemToCategoryDrawer from "./add-item-to-category-drawer";
import actions from "@/actions";
import { Category, List } from "@/store/schema";
import useAppStore from "@/store";

interface Props {
  category: Category;
  list: List;
  isOverlay?: boolean;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category, isOverlay, list } = props;

  const { listId } = useParams();
  const { categoryRemove, categoryUpdate } = useAppStore();

  const {
    attributes,
    listeners,
    setNodeRef: sortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
  });

  const { setNodeRef: droppableRef } = useDroppable({
    id: category.id,
    data: { type: "category", data: category },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const togglePackedMutation = useMutation({
    mutationFn: () => actions.categories.togglePacked(category),
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
            {list.showPacked && (
              <TableHead className="w-8">
                <Checkbox
                  checked={isCategoryFullyPacked(category)}
                  onCheckedChange={() => togglePackedMutation.mutate()}
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
                  categoryUpdate(category.id, { name: value })
                }
              />
            </TableHead>
            {list.showWeights && (
              <TableHead className="w-[7rem] text-center">Weight</TableHead>
            )}
            <TableHead className="w-[5rem]">Qty</TableHead>
            <TableHead className="w-6 pl-0">
              <DeleteButton handleDelete={() => categoryRemove(category.id)} />
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
                3 + (list.showPacked ? 1 : 0) + (list.showImages ? 1 : 0)
              }
            >
              <AddItemToCategoryDrawer category={category} />
            </TableCell>
            {list.showWeights && (
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <span>
                    {formatWeight(
                      getCategoryWeight(
                        category,
                        list.weightUnit ?? ListsWeightUnitOptions.g
                      )
                    )}
                  </span>
                  <span className="min-w-8">
                    {list.weightUnit ?? ListsWeightUnitOptions.g}
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
