"use client";

import { cn, getPaths } from "@/lib/utils";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Gripper from "../base/gripper";
import { toast } from "sonner";
import type { List } from "@/server/db/schema";
import { useParams, usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { getQueryKey } from "@trpc/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  list: List;
  isOverlay?: boolean;
}

const PackingList: React.FC<Props> = (props) => {
  const { list, isOverlay } = props;
  const pathname = usePathname();
  const { listId } = useParams<{ listId: string }>();
  const router = useRouter();

  const queryClient = useQueryClient();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const deleteToastId = React.useRef<string | number | undefined>();
  const deleteListMutation = api.list.delete.useMutation({
    onMutate: () => {
      deleteToastId.current = toast.loading("Deleting list...");
    },
    onSuccess: async (_, variables) => {
      const queryKey = getQueryKey(api.list.get);
      await queryClient.invalidateQueries({ queryKey });
      toast.success("List deleted successfully", { id: deleteToastId.current });
      if (variables === listId) {
        router.push(getPaths.home());
      }
    },
    onError: (error) => {
      toast.error(error.message, { id: deleteToastId.current });
    },
  });

  const duplicateToastId = React.useRef<string | number | undefined>();
  const duplicateListMutation = api.list.duplicate.useMutation({
    onMutate: () => {
      duplicateToastId.current = toast.loading("Duplicating list...");
    },
    onSuccess: async (data) => {
      const queryKey = getQueryKey(api.list.get);
      await queryClient.invalidateQueries({ queryKey });
      toast.success("List duplicated successfully", {
        id: duplicateToastId.current,
      });
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message, { id: duplicateToastId.current });
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
          "flex items-center gap-2 py-0.5 pl-4 pr-2 hover:border-l-4 hover:pl-3",
          pathname === getPaths.list(list.id) &&
            "border-l-4 border-primary bg-secondary pl-3 text-secondary-foreground",
          isOverlay && "rounded border bg-card/70",
          isDragging && "opacity-30",
        )}
      >
        <Gripper
          {...attributes}
          {...listeners}
          isGrabbing={isOverlay}
        ></Gripper>
        <Link
          href={getPaths.list(list.id)}
          className={cn(
            "flex-1 truncate text-sm",
            !list.name && "italic text-muted-foreground",
          )}
        >
          {list.name ?? "Unnamed List"}
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
              onClick={() => duplicateListMutation.mutate(list.id)}
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
