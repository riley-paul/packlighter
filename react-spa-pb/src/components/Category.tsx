import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, GripHorizontal, Plus } from "lucide-react";

interface Props {
  listId: string;
  category: ExpandedCategory;
}

const schema = z.object({
  name: z.string(),
});

export const Category: React.FC<Props> = (props) => {
  const { listId, category } = props;
  const { updateCategory, deleteCategory } = useDataQuery(listId);

  const methods = useForm({
    resolver: zodResolver(schema),
    values: category,
  });

  const { handleSubmit, control } = methods;

  const saveCategory = (data: ExpandedCategory) => {
    updateCategory.mutate({ id: category.id, data });
  };

  return (
    <div>
      <div className="border-b-2 py-1 flex gap-2 items-center group text-sm font-semibold">
        <Button size="icon" variant="ghost" className="">
          <GripHorizontal className="h-5 w-5" />
        </Button>
        <form
          onBlur={handleSubmit(saveCategory)}
          onSubmit={handleSubmit(saveCategory)}
          className="flex-1"
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Category Name"
                className="font-semibold text-teal-400 border-none h-auto text-base px-2 py-1"
              />
            )}
          />
          <input type="hidden" />
        </form>
        <div className="w-14 flex justify-center">Weight</div>
        <div className="w-14 flex justify-center">Qty</div>
        <Button
          size="icon"
          variant="ghost"
          className=""
          onClick={() => deleteCategory.mutate(category.id)}
        >
          <Delete className="h-4 w-4" />
        </Button>
      </div>
      {category.items.map((item) => (
        <div
          key={item.id}
          className="border-b text-sm py-1 flex gap-2 items-center hover:bg-muted transition-colors"
        >
          <Button size="icon" variant="ghost">
            <GripHorizontal className="h-4 w-4" />
          </Button>
          <div className="flex-1">{item.itemData.name}</div>
          <div className="flex-1 text-muted-foreground">
            {item.itemData.description}
          </div>
          <div className="w-14 flex justify-center">
            {item.itemData.weight_g}
          </div>
          <div className="w-14 flex justify-center">{item.quantity}</div>
          <Button size="icon" variant="ghost">
            <Delete className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button size="sm" variant="link" className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Gear
      </Button>
    </div>
  );
};
