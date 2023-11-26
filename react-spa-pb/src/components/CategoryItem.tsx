import { ExpandedCategoryItem, useDataQuery } from "@/hooks/useDataQuery";
import { Delete } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { ItemImage } from "./ItemImage";

interface Props {
  item: ExpandedCategoryItem;
  listId: string;
}

export const CategoryItem: React.FC<Props> = (props) => {
  const { item, listId } = props;
  const { updateCategoryItem, deleteCategoryItem } = useDataQuery(listId);

  const methods = useForm({
    values: item,
  });

  const { handleSubmit, control } = methods;

  const saveCategoryItem = (data: ExpandedCategoryItem) => {
    updateCategoryItem.mutate({ id: item.id, itemId: item.itemData.id, data });
  };

  return (
    <form
      className="border-b text-sm p-1 grid grid-cols-[auto_1fr_3fr_6rem_4rem_auto] gap-2 items-center hover:bg-muted/30 transition-colors"
      onSubmit={handleSubmit(saveCategoryItem)}
      onBlur={handleSubmit(saveCategoryItem)}
    >
      <ItemImage listId={listId} item={item.itemData} />
      <Controller
        control={control}
        name="itemData.name"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Name"
            className="border-none shadow-none"
          />
        )}
      />
      <Controller
        control={control}
        name="itemData.description"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Description"
            className="text-muted-foreground border-none shadow-none"
          />
        )}
      />
      <Controller
        control={control}
        name="itemData.weight_g"
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            min="0"
            className="border-none shadow-none"
          />
        )}
      />
      <Controller
        control={control}
        name="quantity"
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            min="1"
            className="border-none shadow-none"
          />
        )}
      />
      <Button
        size="icon"
        variant="linkMuted"
        onClick={() => deleteCategoryItem.mutate(item.id)}
      >
        <Delete className="h-4 w-4" />
      </Button>
      <input type="hidden" />
    </form>
  );
};
