import { ExpandedCategory, ListWithCategories } from "@/actions/list";
import React from "react";
import { Table, TableCell, TableFooter, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import DeleteButton from "./base/delete-button";
import Gripper from "./base/gripper";

import { useMutation } from "@tanstack/react-query";
import {
  deleteCategory,
  toggleCategoryPacked,
  updateCategory,
} from "@/actions/category";
import { Collections, ListsWeightUnitOptions } from "@/lib/types";
import { queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerInput from "./input/server-input";
import {
  formatWeight,
  getCategoryWeight,
  isCategoryFullyPacked,
} from "@/lib/helpers";
import { createCategoryItem } from "@/actions/categoryItem";
import ListCategoryItem2 from "./list-category-item-2";

interface Props {
  category: ExpandedCategory;
  isOverlay?: boolean;
}

const ListCategory2: React.FC<Props> = (props) => {
  const { category, isOverlay } = props;

  const { listId } = useParams();

  const list = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

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
    <div>
      <header className="flex items-center gap-2 p-1 border-b-2">
        <Gripper isGrabbing={isOverlay} />
        {list?.show_packed && (
          <Checkbox
            checked={isCategoryFullyPacked(category)}
            onCheckedChange={() => toggleCompletionMutation.mutate()}
          />
        )}
        <ServerInput
          className="text-base py-0.25"
          placeholder="Category Name"
          currentValue={category.name}
          onUpdate={(value) => updateCategoryMutation.mutate({ name: value })}
        />
        <DeleteButton handleDelete={() => deleteCategoryMutation.mutate()} />
      </header>
      {category.items.map((item) => (
        <ListCategoryItem2 key={item.id} item={item} />
      ))}

      <Table>
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

export default ListCategory2;
