import { Collections, ListsResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Delete, Copy, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { deleteList } from "@/api/list";
import { queryClient } from "@/lib/query";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  list: ListsResponse;
  isOverlay?: boolean;
}

const PackingList: React.FC<Props> = (props) => {
  const { list, isOverlay } = props;
  const { pathname } = useLocation();
  const { listId } = useParams();
  const navigate = useNavigate();

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(Collections.Lists);
      if (variables === listId) {
        navigate("/");
      }
    },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={list.id}
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex gap-2 items-center pr-2 pl-4 hover:border-l-4 hover:pl-3 py-0.5",
        pathname === `/list/${list.id}` &&
          "border-l-4 pl-3 border-primary text-secondary-foreground bg-secondary",
        isOverlay && "bg-card/70 border rounded",
        isDragging && "opacity-30"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "text-muted-foreground hover:text-foreground cursor-grab"
        )}
      >
        <GripVertical size="1rem" />
      </div>
      <Link
        to={`/list/${list.id}`}
        className={cn(
          "flex-1 truncate text-sm",
          !list.name && "italic text-muted-foreground"
        )}
      >
        {list.name || "Unnamed List"}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("h-8 w-8 p-0", isDragging && "opacity-0")}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => deleteListMutation.mutate(list.id)}>
            Delete List
            <DropdownMenuShortcut>
              <Delete size="1rem" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled
            onClick={() => deleteListMutation.mutate(list.id)}
          >
            Duplicate List
            <DropdownMenuShortcut>
              <Copy size="1rem" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PackingList;
