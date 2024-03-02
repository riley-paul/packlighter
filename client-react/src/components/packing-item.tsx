import { Collections, ItemsResponse } from "@/lib/types";
import React from "react";
import DeleteButton from "./base/delete-button";
import { useMutation } from "react-query";
import { deleteItem } from "@/api/item";
import { queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/helpers";
import Gripper from "./base/gripper";

interface Props {
  item: ItemsResponse;
}

const PackingItem: React.FC<Props> = (props) => {
  const { item } = props;
  const { listId } = useParams();

  const deleteItemMutation = useMutation({
    mutationFn: () => deleteItem(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Items]);
      queryClient.invalidateQueries([Collections.Lists, listId]);
      toast.success(`${item.name || "Unnamed Gear"} deleted successfully`);
    },
  });

  return (
    <div className="flex gap-2 items-center w-full text-sm hover:bg-muted px-2 py-2">
      <Gripper disabled/>
      <div className="flex flex-col flex-1">
        <span className={cn(!item.name && "italic text-muted-foreground")}>
          {item.name || "Unnamed Gear"}
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
