import React from "react";
import DeleteButton from "../base/delete-button";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/helpers";
import Gripper from "../base/gripper";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "@/store/schema";
import useAppStore from "@/store";

interface Props {
  item: Item;
  isOverlay?: boolean;
}

const PackingItem: React.FC<Props> = (props) => {
  const { item, isOverlay } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const { itemRemove } = useAppStore();

  const itemName = item.name || "Unnamed Gear";

  const style = { transform: CSS.Translate.toString(transform) };

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
        <span>{item.weightUnit}</span>
      </span>
      <DeleteButton handleDelete={() => itemRemove(item.id)} />
    </div>
  );
};

export default PackingItem;
