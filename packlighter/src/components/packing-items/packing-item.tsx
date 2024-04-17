import React from "react";
import DeleteButton from "../base/delete-button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/helpers";
import Gripper from "../base/gripper";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Item } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { getQueryKey } from "@trpc/react-query";

interface Props {
  item: Item;
  isOverlay?: boolean;
}

const PackingItem: React.FC<Props> = (props) => {
  const { item, isOverlay } = props;
  const queryClient = useQueryClient();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const itemName = item.name || "Unnamed Gear";

  const style = { transform: CSS.Translate.toString(transform) };

  const deleteToastId = React.useRef<string | number | undefined>();
  const deleteItemMutation = api.item.delete.useMutation({
    onMutate: () => {
      deleteToastId.current = toast.loading("Deleting item...");
    },
    onSuccess: async () => {
      const itemQKey = getQueryKey(api.item.get);
      const listQKey = getQueryKey(api.list.getById);

      await queryClient.invalidateQueries({ queryKey: itemQKey });
      await queryClient.invalidateQueries({ queryKey: listQKey });

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
        "flex w-full items-center gap-2 px-2 py-2 text-sm hover:bg-secondary",
        isOverlay && "rounded outline outline-1 outline-ring",
      )}
    >
      <Gripper {...attributes} {...listeners} />
      <div className="flex flex-1 flex-col">
        <span className={cn(!item.name && "italic text-muted-foreground")}>
          {itemName}
        </span>
        <span className="text-muted-foreground">{item.description}</span>
      </div>
      <span className="flex gap-1 text-muted-foreground">
        <span>{formatWeight(item.weight)}</span>
        <span>{item.weightUnit}</span>
      </span>
      <DeleteButton handleDelete={() => deleteItemMutation.mutate(item.id)} />
    </div>
  );
};

export default PackingItem;
