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

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useMutation } from "react-query";
import { deleteCategory, updateCategory } from "@/api/category";
import { Collections, ListsWeightUnitOptions } from "@/lib/types";
import { queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerInput from "./input/server-input";
import ListCategoryItem from "./list-category-item";
import { formatWeight, getCategoryWeight } from "@/lib/helpers";

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: () => deleteCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
      toast.success(`${category.name || "Unnamed"} category deleted`);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (data: Partial<ExpandedCategory>) =>
      updateCategory({ id: category.id, category: data }),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  return (
    <div
      ref={setNodeRef}
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
            <TableHead className="w-8">
              <Checkbox />
            </TableHead>
            <TableHead
              colSpan={2}
              className="text-foregound text-base font-semibold px-1"
            >
              <ServerInput
                className="text-base"
                currentValue={category.name}
                onUpdate={(value) =>
                  updateCategoryMutation.mutate({ name: value })
                }
              />
            </TableHead>
            <TableHead className="w-[6.5rem] text-center">Weight</TableHead>
            <TableHead className="w-16">Qty</TableHead>
            <TableHead className="w-6 pl-0">
              <DeleteButton
                handleDelete={() => deleteCategoryMutation.mutate()}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.items.map((item) => (
            <ListCategoryItem key={item.id} item={item} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Button variant="linkMuted" size="sm">
                <Plus size="1rem" className="mr-2" />
                Add Item
              </Button>
            </TableCell>
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
