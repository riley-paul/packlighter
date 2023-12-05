import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import { GripVertical, Plus, X } from "lucide-react";
import { CategoryItem } from "./CategoryItem";
import { RecordModel } from "pocketbase";
import { Checkbox } from "./ui/checkbox";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

interface Props {
  list: RecordModel;
  category: ExpandedCategory;
  sortDisabled?: boolean;
}

const schema = z.object({
  name: z.string(),
});

export const Category: React.FC<Props> = (props) => {
  const { category, list, sortDisabled } = props;
  const {
    updateCategory,
    deleteCategory,
    packCategoryItems,
    createCategoryItem,
  } = useDataQuery();

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

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: category.id,
  });

  const categoryPacked =
    category.items.length > 0 && category.items.every((i) => i.packed);

  return (
    <article ref={setNodeRef} {...attributes}>
      <div
        className="border-b-2 p-1 grid gap-1 items-center text-sm font-semibold group"
        style={{
          ...style,
          gridTemplateColumns: `${list.show_packed ? "auto" : ""} 1fr ${
            list.show_weights ? "6rem" : ""
          } 4rem auto auto`,
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
                className="font-semibold text-primary border-none shadow-none text-base"
              />
            )}
          />
          <input type="hidden" />
        </form>
        {list.show_weights && <div className="text-foreground/70">Weight</div>}
        <div className="text-foreground/70">Qty</div>
        <Button
          size="icon"
          variant="ghost"
          className="w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
      <div
        ref={setDroppableNodeRef}
        className={cn(isOver && "border-2 border-red-500")}
      >
        <SortableContext
          id={category.id}
          items={category.items}
          strategy={verticalListSortingStrategy}
        >
          {category.items.map((item) => (
            <CategoryItem
              key={item.id}
              list={list}
              item={item}
              sortDisabled={sortDisabled}
            />
          ))}
          <DragOverlay>
            <CategoryItem
              list={list}
              item={category.items[0]}
              sortDisabled={sortDisabled}
            />
          </DragOverlay>
        </SortableContext>
      </div>
      <div className="mt-2">
        <Button
          variant="linkMuted"
          size="sm"
          onClick={() => createCategoryItem.mutate(category.id)}
          disabled={createCategoryItem.isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </article>
  );
};
