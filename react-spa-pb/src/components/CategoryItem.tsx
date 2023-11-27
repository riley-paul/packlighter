import { ExpandedCategoryItem, useDataQuery } from "@/hooks/useDataQuery";
import { Delete } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { ItemImage } from "./ItemImage";
import { RecordModel } from "pocketbase";
import { Checkbox } from "./ui/checkbox";

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

  return (
    <form
      className="border-b text-sm p-1 grid gap-2 items-center hover:bg-muted/30 transition-colors"
      style={{
        gridTemplateColumns: `${list.show_packed ? "auto" : ""} ${
          list.show_images ? "auto" : ""
        } 1fr 3fr 6rem 4rem auto`,
      }}
      onSubmit={handleSubmit(saveCategoryItem)}
      onBlur={handleSubmit(saveCategoryItem)}
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
