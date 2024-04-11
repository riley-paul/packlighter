import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Gripper from "../base/gripper";
import { Checkbox } from "../ui/checkbox";
import ServerInput from "../input/server-input";
import DeleteButton from "../base/delete-button";
import { useIsFetching, useMutation } from "@tanstack/react-query";
import { CacheKeys, queryClient } from "@/lib/query";

import { useParams } from "react-router-dom";
import ItemImage from "../item-image";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type {
  CategoryItem,
  ExpandedCategoryItem,
  Item,
  List,
} from "@/db/schema";
import { trpc } from "@/client";
import { weightUnits, type WeightUnit } from "@/db/enums";

interface Props {
  item: ExpandedCategoryItem;
  list: List;
  isOverlay?: boolean;
}

const ListCategoryItem: React.FC<Props> = (props) => {
  const { item, isOverlay, list } = props;
  const { listId } = useParams();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
    });
  const style = { transform: CSS.Translate.toString(transform) };

  const deleteMutation = useMutation({
    mutationFn: () => trpc.categoriesItems.delete.mutate(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Items] });
    },
  });

  const togglePackedMutation = useMutation({
    mutationFn: (value: boolean) =>
      trpc.categoriesItems.togglePacked.mutate({ id: item.id, value }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: {
      categoryItem?: Partial<CategoryItem>;
      item?: Partial<Item>;
    }) =>
      Promise.all([
        data.categoryItem
          ? trpc.categoriesItems.update.mutate({
              id: item.id,
              value: data.categoryItem,
            })
          : Promise.resolve(),
        data.item
          ? trpc.items.update.mutate({ id: item.item, value: data.item })
          : Promise.resolve(),
      ]),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.Lists, listId] });
    },
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded",
        isOverlay && "border rounded",
        isDragging && "opacity-30"
      )}
    >
      <TableCell className="w-4 px-1 py-0.5">
        <Gripper {...attributes} {...listeners} />
      </TableCell>
      {list.showPacked && (
        <TableCell className="py-0">
          <Checkbox
            checked={item.packed}
            onCheckedChange={(checked) =>
              togglePackedMutation.mutate(checked === true)
            }
          />
        </TableCell>
      )}
      {list.showImages && (
        <TableCell>
          <ItemImage item={item.itemData} />
        </TableCell>
      )}
      <TableCell className="px-1 py-0.5">
        <ServerInput
          placeholder="Name"
          currentValue={item.itemData.name}
          onUpdate={(name) => updateMutation.mutate({ item: { name } })}
        />
      </TableCell>
      <TableCell className="text-muted-foreground w-1/2 px-1 py-0.5">
        <ServerInput
          placeholder="Description"
          currentValue={item.itemData.description}
          onUpdate={(description) =>
            updateMutation.mutate({ item: { description } })
          }
        />
      </TableCell>
      {list.showWeights && (
        <TableCell className="py-0.5">
          <div className="flex no-spin">
            <ServerInput
              type="number"
              min={0}
              selectOnFocus
              className="text-right"
              currentValue={item.itemData.weight.toLocaleString()}
              onUpdate={(weight) =>
                updateMutation.mutate({ item: { weight: Number(weight) } })
              }
            />
            <Select
              value={item.itemData.weightUnit}
              onValueChange={(value) =>
                updateMutation.mutate({
                  item: {
                    weightUnit: value as WeightUnit,
                  },
                })
              }
            >
              <SelectTrigger className="p-0 px-2 h-auto border-none shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(weightUnits).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TableCell>
      )}
      <TableCell className="py-0.5">
        <ServerInput
          type="number"
          min={1}
          selectOnFocus
          currentValue={item.quantity.toLocaleString()}
          onUpdate={(quantity) =>
            updateMutation.mutate({
              categoryItem: { quantity: Number(quantity) },
            })
          }
        />
      </TableCell>
      <TableCell className="py-0.5 pl-0">
        <DeleteButton handleDelete={() => deleteMutation.mutate()} />
      </TableCell>
    </TableRow>
  );
};

export default ListCategoryItem;
