import React from "react";
import { ExpandedCategory, ExpandedCategoryItem } from "@/api/list";
import { DataTable } from "./data-table";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "react-query";
import { updateCategoryItem } from "@/api/categoryItem";
import { useParams } from "react-router-dom";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import {
  isCategoryFullyPacked,
  isCategoryPartiallyPacked,
} from "@/lib/helpers";
import { toggleCategoryPacked } from "@/api/category";
import ServerInput from "../input/server-input";
import { updateItem } from "@/api/item";

interface Props {
  category: ExpandedCategory;
}

export default function ListCategory(
  props: Props
): ReturnType<React.FC<Props>> {
  const { category } = props;

  const { listId } = useParams();

  const updateCatItemMutation = useMutation({
    mutationFn: updateCategoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  const toggleCategoryPackedMutation = useMutation({
    mutationFn: toggleCategoryPacked,
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  const columns = React.useMemo<ColumnDef<ExpandedCategoryItem>[]>(
    () => [
      {
        id: "packed",
        accessorFn: (row) => row.packed,
        cell: (ctx) => (
          <Checkbox
            checked={ctx.getValue() as boolean}
            onCheckedChange={(v) =>
              updateCatItemMutation.mutate({
                id: ctx.row.original.id,
                categoryItem: { packed: v === true ? true : false },
              })
            }
            aria-label="pack item"
          />
        ),
        header: () => (
          <Checkbox
            checked={
              isCategoryFullyPacked(category)
                ? true
                : isCategoryPartiallyPacked(category)
                ? "indeterminate"
                : false
            }
            onCheckedChange={() => {
              toggleCategoryPackedMutation.mutate(category);
            }}
            aria-label="pack category"
          />
        ),
      },
      {
        id: "name",
        header: "Name",
        accessorFn: (row) => row.itemData.name,
        cell: (ctx) => (
          <ServerInput
            currentValue={ctx.getValue() as string}
            onUpdate={(v) =>
              updateItemMutation.mutate({
                id: ctx.row.original.item,
                item: { name: v as string },
              })
            }
          />
        ),
      },
      {
        id: "description",
        header: "Description",
        accessorFn: (row) => row.itemData.description,
      },
    ],
    [category, toggleCategoryPackedMutation, updateCatItemMutation]
  );

  return <DataTable columns={columns} data={category.items} />;
}
