import { ExpandedCategoryItem, useDataQuery } from "@/hooks/useDataQuery";
import { Delete, GripVertical } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

interface Props {
  item: ExpandedCategoryItem;
  listId: string;
}

const itemSchema = z.object({
  name: z.string(),
  description: z.string(),
  weight_g: z.number(),
});

const categoryItemSchema = z.object({
  quantity: z.number(),
  packed: z.boolean(),
  itemData: itemSchema,
});

export const CategoryItem: React.FC<Props> = (props) => {
  const { item, listId } = props;
  const { updateCategoryItem } = useDataQuery(listId);

  const methods = useForm({
    resolver: zodResolver(categoryItemSchema),
    values: item,
  });

  const { handleSubmit, control } = methods;

  const saveCategoryItem = (data: ExpandedCategoryItem) => {
    updateCategoryItem.mutate({ id: item.id, itemId: item.itemData.id, data });
  };

  return (
    <form
      className="border-b text-sm py-1 grid grid-cols-[2rem_2rem_1fr_3fr_4rem_4rem_auto] gap-2 items-center hover:bg-muted/50 transition-colors"
      onSubmit={handleSubmit(saveCategoryItem)}
      onBlur={handleSubmit(saveCategoryItem)}
    >
      <i className="cursor-grab">
        <GripVertical className="h-4 w-4" />
      </i>
      <Checkbox />
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
      <div className="flex justify-center">{item.itemData.weight_g}</div>
      <div className="flex justify-center">{item.quantity}</div>
      <Button size="icon" variant="ghost">
        <Delete className="h-4 w-4" />
      </Button>
      <input type="hidden" />
    </form>
  );
};
