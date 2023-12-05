import { GripVertical, X } from "lucide-react";
import { RecordModel } from "pocketbase";
import { Button } from "./ui/button";
import { useDataQuery } from "@/hooks/useDataQuery";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: RecordModel;
}

export const ItemListItem: React.FC<Props> = ({ item }) => {
  const { deleteItem } = useDataQuery();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      {...attributes}
      style={style}
      ref={setNodeRef}
      className="text-sm pr-2 py-1 hover:bg-card transition-colors flex items-center gap-1"
    >
      <div {...listeners}>
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <h3 className="">{item.name}</h3>
        <p className="text-muted-foreground text-xs">{item.description}</p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6"
        onClick={() => deleteItem.mutate(item.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
