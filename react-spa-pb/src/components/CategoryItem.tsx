import { ExpandedCategoryItem, useDataQuery } from "@/hooks/useDataQuery";
import { Delete, GripVertical } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";

interface Props {
  item: ExpandedCategoryItem;
  listId: string;
}

export const CategoryItem: React.FC<Props> = (props) => {
  const { item, listId } = props;
  const { updateCategoryItem } = useDataQuery(listId);

  const methods = useForm({
    values: item,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  React.useEffect(() => console.log(errors), [errors]);

  const saveCategoryItem = (data: ExpandedCategoryItem) => {
    updateCategoryItem.mutate({ id: item.id, itemId: item.itemData.id, data });
  };

  return (
    <form
      className="border-b text-sm py-1 grid grid-cols-[2rem_1fr_3fr_4rem_4rem_auto] gap-2 items-center hover:bg-muted/50 transition-colors"
      onSubmit={handleSubmit(saveCategoryItem)}
      onBlur={handleSubmit(saveCategoryItem)}
    >
      <i className="cursor-grab flex items-center">
        <GripVertical className="h-4 w-4" />
      </i>
      <Controller
        control={control}
        name="itemData.name"
        render={({ field }) => (
          <Input {...field} placeholder="Name" className="border-none" />
        )}
      />
      <Controller
        control={control}
        name="itemData.description"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Description"
            className="text-muted-foreground border-none"
          />
        )}
      />
      <Controller
        control={control}
        name="itemData.weight_g"
        render={({ field }) => (
          <Input {...field} type="number" min="0" className="border-none" />
        )}
      />
      <Controller
        control={control}
        name="quantity"
        render={({ field }) => (
          <Input {...field} type="number" min="1" className="border-none" />
        )}
      />
      <Button size="icon" variant="ghost">
        <Delete className="h-4 w-4" />
      </Button>
      <input type="hidden" />
    </form>
  );
};
