import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Gripper from "../base/gripper";
import { Checkbox } from "../ui/checkbox";
import ServerInput from "../input/server-input";
import { ExpandedCategoryItem, ListWithCategories } from "@/actions/list";
import DeleteButton from "../base/delete-button";
import { useMutation } from "@tanstack/react-query";
import { deleteCategoryItem, updateCategoryItem } from "@/actions/categoryItem";
import { queryClient } from "@/lib/query";
import {
  CategoriesItemsResponse,
  Collections,
  ItemsResponse,
  ItemsWeightUnitOptions,
} from "@/lib/types";
import ItemImage from "../item-image";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { ActiveDraggable } from "../app-dnd-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useListId from "@/hooks/useListId";

interface Props {
  item: ExpandedCategoryItem;
  isOverlay?: boolean;
}

const ListCategoryItem: React.FC<Props> = (props) => {
  const { item, isOverlay } = props;
  const listId = useListId()

  const list = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

  const sortableData: ActiveDraggable = {
    type: "category-item",
    data: item,
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
      data: sortableData,
    });
  const style = { transform: CSS.Translate.toString(transform) };

  const deleteMutation = useMutation({
    mutationFn: () => deleteCategoryItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      queryClient.invalidateQueries({ queryKey: [Collections.Items] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: {
      categoryItem?: Partial<CategoriesItemsResponse>;
      item?: Partial<ItemsResponse>;
    }) =>
      updateCategoryItem({
        id: item.id,
        itemId: data.item ? item.item : undefined,
        categoryItem: data.categoryItem ?? {},
        item: data.item ?? {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
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
      {list?.show_packed && (
        <TableCell className="py-0">
          <Checkbox
            checked={item.packed}
            onCheckedChange={(packed) =>
              updateMutation.mutate({
                categoryItem: { packed: Boolean(packed) },
              })
            }
          />
        </TableCell>
      )}
      {list?.show_images && (
        <TableCell>
          <div className={cn(!item.itemData.image && "absolute inset-2")}>
            <ItemImage item={item.itemData} />
          </div>
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
      {list?.show_weights && (
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
              value={item.itemData.weight_unit}
              onValueChange={(value) =>
                updateMutation.mutate({
                  item: {
                    weight_unit: value as ItemsWeightUnitOptions,
                  },
                })
              }
            >
              <SelectTrigger className="p-0 px-2 h-auto border-none shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ItemsWeightUnitOptions).map((unit) => (
                  <SelectItem value={unit}>{unit}</SelectItem>
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
