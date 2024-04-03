import { Collections, ListsResponse } from "@/lib/types";
import { cn, getPaths } from "@/lib/utils";
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal, Delete, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { deleteList } from "@/api/list";
import { queryClient } from "@/lib/query";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Gripper from "./base/gripper";
import { toast } from "sonner";

interface Props {
  list: ListsResponse;
  isOverlay?: boolean;
}

const PackingList: React.FC<Props> = (props) => {
  const { list, isOverlay } = props;
  const { pathname } = useLocation();
  const { listId } = useParams();
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const deleteToastId = React.useRef<string | number | undefined>(undefined);
  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onMutate: () => {
      deleteToastId.current = toast.loading("Deleting list...");
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [Collections.Lists] });
      toast.success("List deleted successfully", { id: deleteToastId.current });
      if (variables === listId) {
        navigate(getPaths.home());
      }
    },
    onError: (error) => {
      toast.error(error.message, { id: deleteToastId.current });
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
    <>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              packing list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteListMutation.mutate(list.id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div
        key={list.id}
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex gap-2 items-center pr-2 pl-4 hover:border-l-4 hover:pl-3 py-0.5",
          pathname === getPaths.list(list.id) &&
            "border-l-4 pl-3 border-primary text-secondary-foreground bg-secondary",
          isOverlay && "bg-card/70 border rounded",
          isDragging && "opacity-30"
        )}
      >
        <Gripper
          {...attributes}
          {...listeners}
          isGrabbing={isOverlay}
        ></Gripper>
        <Link
          to={getPaths.list(list.id)}
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
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
    </>
  );
};

export default PackingList;
