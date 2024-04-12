import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Gripper from "../base/gripper";
import { Checkbox } from "../ui/checkbox";
import ServerInput from "../input/server-input";
import DeleteButton from "../base/delete-button";
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
import { CategoryItem, List, WeightUnits, weightUnits } from "@/store/schema";
import useAppStore from "@/store";

interface Props {
  categoryItem: CategoryItem;
  list: List;
  isOverlay?: boolean;
}

const ListCategoryItem: React.FC<Props> = (props) => {
  const { categoryItem, isOverlay, list } = props;
  const { itemGet, categoryItemUpdate, itemUpdate } = useAppStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: categoryItem.id,
    });
  const style = { transform: CSS.Translate.toString(transform) };

  const item = itemGet(categoryItem.itemId);
  if (!item) return null;

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
            checked={categoryItem.packed}
            onCheckedChange={(packed) =>
              categoryItemUpdate(categoryItem.id, { packed: Boolean(packed) })
            }
          />
        </TableCell>
      )}
      {list.showImages && (
        <TableCell>
          <div className={cn(!item.imageUrl && "absolute inset-2")}>
            <ItemImage item={item} />
          </div>
        </TableCell>
      )}
      <TableCell className="px-1 py-0.5">
        <ServerInput
          placeholder="Name"
          currentValue={item.name}
          onUpdate={(name) => itemUpdate(item.id, { name })}
        />
      </TableCell>
      <TableCell className="text-muted-foreground w-1/2 px-1 py-0.5">
        <ServerInput
          placeholder="Description"
          currentValue={item.description}
          onUpdate={(description) => itemUpdate(item.id, { description })}
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
              currentValue={item.weight.toLocaleString()}
              onUpdate={(weight) =>
                itemUpdate(item.id, { weight: Number(weight) })
              }
            />
            <Select
              value={item.weightUnit}
              onValueChange={(value) =>
                itemUpdate(item.id, {
                  weightUnit: value as WeightUnits,
                })
              }
            >
              <SelectTrigger className="p-0 px-2 h-auto border-none shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(weightUnits).map((unit) => (
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
          currentValue={categoryItem.quantity.toLocaleString()}
          onUpdate={(quantity) =>
            categoryItemUpdate(categoryItem.id, { quantity: Number(quantity) })
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
