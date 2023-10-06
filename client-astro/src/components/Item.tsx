import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { ItemImage } from "./ItemImage";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import type { ItemType } from "@/lib/schema";

interface Props {
  item: ItemType;
  showDragger: boolean;
  showQuantity: boolean;
}

export const Item: React.FC<Props> = ({
  item,
  showDragger = true,
  showQuantity = false,
}) => (
  <section
    className={cn(
      "py-2 text-sm grid gap-2 items-center",
      "grid-cols-[auto_1fr]",
      showDragger && !showQuantity && "grid-cols-[auto_auto_1fr]",
      !showDragger && showQuantity && "grid-cols-[auto_1fr_auto]",
      showDragger && showQuantity && "grid-cols-[auto_auto_1fr_auto]"
    )}
  >
    {showDragger && <GripVertical className="h-4 w-4" />}
    <ItemImage item={item} />
    <div>
      <div className="flex w-full justify-between items-center">
        <span>{item.name}</span>
        <span>{item.weight_g}g</span>
      </div>
      <p className="text-muted-foreground">{item.description}</p>
    </div>
    {showQuantity && (
      <div className="flex items-center gap-1">
        <span>
          <X className="h-4 w-4" />
        </span>
        <span className="w-4 text-center">{count}</span>
        <div className="flex flex-col divide-y border rounded">
          <button className="p-0.5" onClick={() => (count += 1)}>
            <ChevronUp className="h-3 w-3" />
          </button>
          <button className="p-0.5" onClick={() => (count -= 1)}>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    )}
  </section>
);
