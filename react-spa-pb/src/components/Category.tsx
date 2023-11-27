import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, Plus } from "lucide-react";
import { CategoryItem } from "./CategoryItem";
import { RecordModel } from "pocketbase";
import { Checkbox } from "./ui/checkbox";

interface Props {
  list: RecordModel;
  category: ExpandedCategory;
}

const schema = z.object({
  name: z.string(),
});

export const Category: React.FC<Props> = (props) => {
  const { category, list } = props;
  const { updateCategory, deleteCategory, packCategoryItems } = useDataQuery();

  const methods = useForm({
    resolver: zodResolver(schema),
    values: category,
  });

  const { handleSubmit, control } = methods;

  const saveCategory = (data: ExpandedCategory) => {
    updateCategory.mutate({ id: category.id, data });
  };

  const categoryPacked =
    category.items.length > 0 && category.items.every((i) => i.packed);

  return (
    <article>
      <div
        className="border-b-2 p-1 grid gap-2 items-center group text-sm font-semibold"
        style={{
          gridTemplateColumns: `${
            list.show_packed ? "auto" : ""
          } 1fr 6rem 4rem auto`,
        }}
      >
        <Checkbox
          checked={categoryPacked}
          onCheckedChange={(checked) =>
            packCategoryItems.mutate({ category, packed: Boolean(checked) })
          }
        />
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
                className="font-semibold text-accent-foreground border-none shadow-none text-base"
              />
            )}
          />
          <input type="hidden" />
        </form>
        <div>Weight</div>
        <div>Qty</div>
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
        <CategoryItem key={item.id} list={list} item={item} />
      ))}
      <Button size="sm" variant="linkMuted" className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Gear
      </Button>
    </article>
  );
};
