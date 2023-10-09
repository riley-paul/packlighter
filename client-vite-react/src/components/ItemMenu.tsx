import { cn } from "@/lib/utils";
import { MoreVertical, Delete, Copy } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu";
import { useAppStore } from "@/lib/store";
import { ItemType } from "@/lib/schema";
import React from "react";

interface Props {
  item: ItemType;
}

export const ItemMenu: React.FC<Props> = (props) => {
  const { item } = props;
  const { removeItem, addItem } = useAppStore((state) => ({
    removeItem: state.removeItem,
    addItem: state.addItem,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-full w-6"
        )}
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => removeItem(item.id)}>
          Delete
          <DropdownMenuShortcut>
            <Delete className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => addItem(item)}>
          Duplicate
          <DropdownMenuShortcut>
            <Copy className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
