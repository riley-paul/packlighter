import { cn } from "@/lib/utils";
import { MoreVertical, Delete } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu";
import { useAppStore } from "@/lib/store";
import { CategoryType } from "@/lib/schema";
import React from "react";

interface Props {
  listId: string;
  category: CategoryType;
}

export const CategoryMenu: React.FC<Props> = (props) => {
  const { listId, category } = props;
  const { removeCategory } = useAppStore((state) => ({
    removeCategory: state.removeCategory,
    addCategory: state.addCategory,
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-full w-8"
        )}
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => removeCategory(listId, category.id)}>
          Delete
          <DropdownMenuShortcut>
            <Delete className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
