import { Collections, ItemsResponse } from "@/lib/types";
import React from "react";
import DeleteButton from "../base/delete-button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/helpers";
import Gripper from "../base/gripper";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ActiveDraggable } from "../app-dnd-wrapper";
import actions from "@/actions";
import useListId from "@/hooks/useListId";

interface Props {
  item: ItemsResponse;
  isOverlay?: boolean;
}

const PackingItem: React.FC<Props> = (props) => {
  const { item, isOverlay } = props;
  const listId = useListId()

  const sortableData: ActiveDraggable = {
    type: "item",
    data: item,
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: sortableData,
  });

  const itemName = item.name || "Unnamed Gear";

  const style = { transform: CSS.Translate.toString(transform) };

  const deleteToastId = React.useRef<string | number | undefined>(undefined);

  const deleteItemMutation = useMutation({
    mutationFn: () => actions.items.delete(item.id),
    onMutate: () => {
      deleteToastId.current = toast.loading("Deleting item...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Items] });
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      toast.success(`${itemName} deleted successfully`, {
        id: deleteToastId.current,
      });
    },
    onError: (error) => {
      toast.error(error.message, { id: deleteToastId.current });
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex gap-2 items-center w-full text-sm hover:bg-secondary px-2 py-2",
        isOverlay && "rounded outline outline-1 outline-ring"
      )}
    >
      <Gripper {...attributes} {...listeners} />
      <div className="flex flex-col flex-1">
        <span className={cn(!item.name && "italic text-muted-foreground")}>
          {itemName}
        </span>
        <span className="text-muted-foreground">{item.description}</span>
      </div>
      <span className="text-muted-foreground flex gap-1">
        <span>{formatWeight(item.weight)}</span>
        <span>{item.weight_unit}</span>
      </span>
      <DeleteButton handleDelete={() => deleteItemMutation.mutate()} />
    </div>
  );
};

export default PackingItem;
