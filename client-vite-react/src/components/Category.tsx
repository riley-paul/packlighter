import { Grabber } from "@/components/Grabber";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType, ItemType, ListItemType } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Delete, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ItemPicker } from "./ItemPicker";
import { ItemImage } from "./ItemImage";
import { ItemParams } from "./ItemParams";
import { Separator } from "./ui/separator";

type ListItemWithItem = ListItemType & { item: ItemType };

interface Props {
  listId: string;
  category: CategoryType;
}

export const Category: React.FC<Props> = (props) => {
  const { category, listId } = props;

  const { getItem, removeCategory, updateCategory, removeListItem } =
    useAppStore((state) => ({
      getItem: state.getItem,
      removeCategory: state.removeCategory,
      updateCategory: state.updateCategory,
      removeListItem: state.removeListItem,
    }));

  const categoryItems: ListItemWithItem[] = category.items
    .map((i) => ({ ...i, item: getItem(i.itemId) }))
    .filter((i): i is ListItemWithItem => i.item !== undefined);

  return (
    <div className="grid">
      <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 border-b-2 pb-2">
        <Grabber />
        <Input
          type="text"
          value={category.name}
          placeholder="Unnamed Category"
          className="text-md border-none px-1 py-0.5 h-auto font-medium"
          onChange={(e) =>
            updateCategory(listId, category.id, { name: e.target.value })
          }
        />
        <ItemPicker listId={listId} categoryId={category.id} />

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-full w-7"
            )}
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => removeCategory(listId, category.id)}
            >
              Delete
              <DropdownMenuShortcut>
                <Delete className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {categoryItems.length > 0 ? (
        categoryItems.map((listItem) => (
          <>
            <div className="flex gap-2 items-center p-2">
              <ItemImage item={listItem.item} />
              <ItemParams item={listItem.item} />
              <Button
                size="icon"
                variant="ghost"
                className="h-full"
                onClick={() => removeListItem(listId, category.id, listItem.id)}
              >
                <Delete className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
          </>
        ))
      ) : (
        <div className="p-2 text-sm text-muted-foreground">No items yet</div>
      )}
    </div>
  );
};
