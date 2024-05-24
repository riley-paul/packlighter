import React from "react";
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

const ListCategoryItem2: React.FC<Props> = (props) => {
  const { item } = props;
  const listId = useListId()

  const list = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

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
    <article className="flex items-center p-1 gap-2 border-b transition-colors hover:bg-muted/50">
      <Gripper />
      {list?.show_packed && (
        <Checkbox
          checked={item.packed}
          onCheckedChange={(packed) =>
            updateMutation.mutate({
              categoryItem: { packed: Boolean(packed) },
            })
          }
        />
      )}
      {list?.show_images && <ItemImage item={item.itemData} />}
      <div className="flex-1">
        <ServerInput
          placeholder="Name"
          currentValue={item.itemData.name}
          onUpdate={(name) => updateMutation.mutate({ item: { name } })}
        />
        <ServerInput
          placeholder="Description"
          className="text-muted-foreground"
          currentValue={item.itemData.description}
          onUpdate={(description) =>
            updateMutation.mutate({ item: { description } })
          }
        />
      </div>
      {list?.show_weights && (
        <div className="flex no-spin max-w-24">
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
      )}
      <ServerInput
        type="number"
        className="max-w-16"
        min={1}
        selectOnFocus
        currentValue={item.quantity.toLocaleString()}
        onUpdate={(quantity) =>
          updateMutation.mutate({
            categoryItem: { quantity: Number(quantity) },
          })
        }
      />
      <DeleteButton handleDelete={() => deleteMutation.mutate()} />
    </article>
  );
};

export default ListCategoryItem2;
