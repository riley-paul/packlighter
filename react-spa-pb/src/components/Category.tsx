import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import {  GripVertical, X } from "lucide-react";
import { CategoryItem } from "./CategoryItem";
import { RecordModel } from "pocketbase";
import { Checkbox } from "./ui/checkbox";
import { AddItem } from "./AddItem";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const categoryPacked =
    category.items.length > 0 && category.items.every((i) => i.packed);

  return (
    <article ref={setNodeRef} {...attributes}>
      <div
        className="border-b-2 p-1 grid gap-1 items-center text-sm font-semibold"
        style={{
          ...style,
          gridTemplateColumns: `${
            list.show_packed ? "auto" : ""
          } 1fr 6rem 4rem auto auto`,
        }}
      >
        {list.show_packed && (
          <Checkbox
            checked={categoryPacked}
            onCheckedChange={(checked) =>
              packCategoryItems.mutate({ category, packed: Boolean(checked) })
            }
          />
        )}
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
          className="text-muted-foreground w-6 hover:text-destructive"
          onClick={() => deleteCategory.mutate(category.id)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "hover:text-foreground text-muted-foreground w-6"
          )}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </div>
      </div>
      <SortableContext
        items={category.items}
        strategy={verticalListSortingStrategy}
      >
        {category.items.map((item) => (
          <CategoryItem key={item.id} list={list} item={item} />
        ))}
      </SortableContext>
      <div className="mt-2">
        <AddItem category={category} />
      </div>
    </article>
  );
};
