import { ExpandedCategoryItem, useDataQuery } from "@/hooks/useDataQuery";
import { GripVertical, X } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { ItemImage } from "./ItemImage";
import { RecordModel } from "pocketbase";
import { Checkbox } from "./ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface Props {
  list: RecordModel;
  item: ExpandedCategoryItem;
}

export const CategoryItem: React.FC<Props> = (props) => {
  const { item, list } = props;
  const { updateCategoryItem, deleteCategoryItem } = useDataQuery();

  const methods = useForm({
    values: item,
  });

  const { handleSubmit, control } = methods;

  const saveCategoryItem = (data: ExpandedCategoryItem) => {
    updateCategoryItem.mutate({
      id: item.id,
      itemId: item.itemData.id,
      data,
    });
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <form
      ref={setNodeRef}
      className="border-b text-sm p-1 grid gap-1 items-center hover:bg-muted/30 transition-colors group"
      style={{
        ...style,
        gridTemplateColumns: `${list.show_packed ? "auto" : ""} ${
          list.show_images ? "auto" : ""
        } 1fr 3fr ${list.show_weights ? "6rem" : ""} 4rem auto auto`,
      }}
      onSubmit={handleSubmit(saveCategoryItem)}
      onBlur={handleSubmit(saveCategoryItem)}
      {...attributes}
    >
      {list.show_packed && (
        <Checkbox
          checked={item.packed}
          onCheckedChange={(checked) =>
            updateCategoryItem.mutate({
              id: item.id,
              data: { packed: checked },
            })
          }
        />
      )}
      {list.show_images && <ItemImage item={item.itemData} />}
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
      {list.show_weights && (
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
      )}
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
        variant="ghost"
        className="w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => deleteCategoryItem.mutate(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "text-muted-foreground w-6 hover:text-foreground"
        )}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <input type="hidden" />
    </form>
  );
};
