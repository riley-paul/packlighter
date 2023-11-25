import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, GripVertical, Plus } from "lucide-react";
import { CategoryItem } from "./CategoryItem";

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
    <article>
      <div className="border-b-2 py-1 flex gap-2 items-center group text-sm font-semibold">
        <i className="px-1 cursor-grab">
          <GripVertical className="h-5 w-5" />
        </i>
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
        <CategoryItem key={item.id} item={item} listId={listId} />
      ))}
      <Button size="sm" variant="link" className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Gear
      </Button>
    </article>
  );
};
