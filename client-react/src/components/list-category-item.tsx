import React from "react";
import { TableCell, TableRow } from "./ui/table";
import Gripper from "./base/gripper";
import { Checkbox } from "./ui/checkbox";
import ServerInput from "./input/server-input";
import { ExpandedCategoryItem, ListWithCategories } from "@/api/list";
import DeleteButton from "./base/delete-button";
import { useMutation } from "react-query";
import { deleteCategoryItem, updateCategoryItem } from "@/api/categoryItem";
import { queryClient } from "@/lib/query";
import {
  CategoriesItemsResponse,
  Collections,
  ItemsResponse,
  ItemsWeightUnitOptions,
} from "@/lib/types";
import { useParams } from "react-router-dom";
import ItemImage from "./item-image";

interface Props {
  item: ExpandedCategoryItem;
}

const ListCategoryItem: React.FC<Props> = (props) => {
  const { item } = props;
  const { listId } = useParams();

  const list = queryClient.getQueryData<ListWithCategories>([
    Collections.Lists,
    listId,
  ]);

  const deleteMutation = useMutation({
    mutationFn: () => deleteCategoryItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
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
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  return (
    <TableRow>
      <TableCell className="w-4 px-1">
        <Gripper />
      </TableCell>
      {list?.show_packed && (
        <TableCell>
          <Checkbox />
        </TableCell>
      )}
      {list?.show_images && (
        <TableCell>
          <ItemImage item={item.itemData} />
        </TableCell>
      )}
      <TableCell className="px-1">
        <ServerInput
          currentValue={item.itemData.name}
          onUpdate={(name) => updateMutation.mutate({ item: { name } })}
        />
      </TableCell>
      <TableCell className="text-muted-foreground w-1/2 px-1">
        <ServerInput
          currentValue={item.itemData.description}
          onUpdate={(description) =>
            updateMutation.mutate({ item: { description } })
          }
        />
      </TableCell>
      {list?.show_weights && (
        <TableCell className="py-0">
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
            <select
              className="bg-inherit"
              value={item.itemData.weight_unit}
              onChange={(ev) =>
                updateMutation.mutate({
                  item: {
                    weight_unit: ev.target.value as ItemsWeightUnitOptions,
                  },
                })
              }
            >
              {Object.values(ItemsWeightUnitOptions).map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </TableCell>
      )}
      <TableCell>
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
      <TableCell className="py-0 pl-0">
        <DeleteButton handleDelete={() => deleteMutation.mutate()} />
      </TableCell>
    </TableRow>
  );
};

export default ListCategoryItem;
