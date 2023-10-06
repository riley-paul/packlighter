import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { GripVertical } from "lucide-react";
import React from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface Props {
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

export const Grabber: React.FC<Props> = ({ attributes, listeners }) => (
  <div
    className={cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "h-full w-6 justify-center"
    )}
    {...attributes}
    {...listeners}
  >
    <GripVertical className="h-5 w-5 text-muted-foreground" />
  </div>
);
