import React from "react";
import { TableCell, TableRow } from "./ui/table";
import Gripper from "./base/gripper";
import { Checkbox } from "./ui/checkbox";
import ServerInput from "./input/server-input";
import { ExpandedCategoryItem } from "@/api/list";
import DeleteButton from "./base/delete-button";
import { useMutation } from "react-query";
import { deleteCategoryItem, updateCategoryItem } from "@/api/categoryItem";
import { queryClient } from "@/lib/query";
import {
  CategoriesItemsResponse,
  Collections,
  ItemsResponse,
} from "@/lib/types";
import { useParams } from "react-router-dom";

interface Props {
  item: ExpandedCategoryItem;
}

const ListCategoryItem: React.FC<Props> = (props) => {
  const { item } = props;
  const { listId } = useParams();

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
      <TableCell>
        <Checkbox />
      </TableCell>
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
      <TableCell>{item.itemData.weight}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell className="py-0">
        <DeleteButton handleDelete={() => deleteMutation.mutate()} />
      </TableCell>
    </TableRow>
  );
};

export default ListCategoryItem;
