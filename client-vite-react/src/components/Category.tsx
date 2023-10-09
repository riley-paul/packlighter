import { Grabber } from "@/components/Grabber";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType, ItemType } from "@/lib/schema";
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
import { Item } from "@/components/Item";
import { ItemPicker } from "./ItemPicker";

interface Props {
  listId: string;
  category: CategoryType;
}

export const Category: React.FC<Props> = (props) => {
  const { category, listId } = props;

  const { getItem, removeCategory, updateCategory } = useAppStore((state) => ({
    getItem: state.getItem,
    removeCategory: state.removeCategory,
    updateCategory: state.updateCategory,
  }));

  return (
    <div className="grid">
      <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 border-b pb-2">
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
        <ItemPicker />

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
      {category.items
        .map((i) => getItem(i.id))
        .filter((i): i is ItemType => i !== undefined)
        .map((item) => (
          <Item item={item} />
        ))}
    </div>
  );
};
