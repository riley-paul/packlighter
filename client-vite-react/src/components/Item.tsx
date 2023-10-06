import { cn } from "@/lib/utils";
import React from "react";
import { ItemImage } from "./ItemImage";
import { ItemParams } from "./ItemParams";
import { ItemType } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Grabber } from "./Grabber";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Delete } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";

export const Item: React.FC<{ item: ItemType }> = ({ item }) => {
  const { removeItem } = useAppStore((state) => ({
    updateItem: state.updateItem,
    removeItem: state.removeItem,
  }));

  return (
    <section
      className={cn(
        "py-2 text-sm grid gap-2 items-center",
        "grid-cols-[auto_auto_1fr_auto]"
      )}
    >
      <Grabber />
      <ItemImage item={item} />
      <ItemParams item={item} />
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-full w-7 text-muted-foreground"
          )}
        >
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => removeItem(item.id)}>
            Delete
            <DropdownMenuShortcut>
              <Delete className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};
