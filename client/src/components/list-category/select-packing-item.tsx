import { Collections, ItemsResponse } from "@/lib/types";
import React from "react";
import DeleteButton from "../base/delete-button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/helpers";

import { Checkbox } from "../ui/checkbox";
import actions from "@/actions";
import useListId from "@/hooks/useListId";

interface Props {
  item: ItemsResponse;
  selected: boolean;
  onSelect: (id: string) => void;
}

const SelectPackingItem: React.FC<Props> = (props) => {
  const { item, selected, onSelect } = props;
  const listId = useListId()

  const itemName = item.name || "Unnamed Gear";

  const deleteToastId = React.useRef<string | number | undefined>();
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
      onClick={() => onSelect(item.id)}
      className={cn(
        "flex gap-3 items-center w-full text-sm hover:bg-secondary px-2 py-2",
        selected && "bg-secondary/50"
      )}
    >
      <Checkbox checked={selected} />
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

export default SelectPackingItem;
