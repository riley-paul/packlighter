import { cn, getPaths } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";
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

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Gripper from "../base/gripper";
import { useMediaQuery } from "usehooks-ts";
import { MOBILE_MEDIA_QUERY } from "@/lib/constants";
import { useStore } from "@/lib/store";
import useAppStore from "@/store";
import { List } from "@/store/schema";

interface Props {
  list: List;
  isOverlay?: boolean;
}

const PackingList: React.FC<Props> = (props) => {
  const { list, isOverlay } = props;
  const { pathname } = useLocation();

  const { listRemove } = useAppStore();

  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const { isSidebarOpen, toggleSidebar } = useStore();

  const onNavigate = React.useCallback(() => {
    if (isMobile && isSidebarOpen) {
      toggleSidebar(false);
    }
  }, [isMobile, isSidebarOpen, toggleSidebar]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

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
            <AlertDialogAction onClick={() => listRemove(list.id)}>
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
        <Gripper {...attributes} {...listeners} isGrabbing={isOverlay} />
        <Link
          to={getPaths.list(list.id)}
          onClick={onNavigate}
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

            <DropdownMenuItem disabled>
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
