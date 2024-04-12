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
import { ListsWeightUnitOptions } from "@/lib/types";
import ServerInput from "../input/server-input";
import ListCategoryItem from "./list-category-item";
import { formatWeight, getCategoryWeight } from "@/lib/helpers";
import { useDroppable } from "@dnd-kit/core";
import { Category, List } from "@/store/schema";
import useAppStore from "@/store";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface Props {
  category: Category;
  list: List;
  isOverlay?: boolean;
}

const ListCategory: React.FC<Props> = (props) => {
  const { category, isOverlay, list } = props;

  const {
    categoryRemove,
    categoryUpdate,
    categoryItemCreate,
    itemCreate,
    categoryTogglePacked,
  } = useAppStore();

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
                  checked={category.items.every((i) => i.packed)}
                  onCheckedChange={() => categoryTogglePacked(category.id)}
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
              <ListCategoryItem key={item.id} categoryItem={item} list={list} />
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
                variant="linkMuted"
                size="sm"
                onClick={() => {
                  const newItem = itemCreate();
                  categoryItemCreate(category.id, { itemId: newItem.id });
                }}
              >
                <Plus size="1rem" className="mr-2" />
                Add Item
              </Button>
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
