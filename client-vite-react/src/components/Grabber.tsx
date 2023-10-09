import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Grip } from "lucide-react";
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
      "h-full w-8 justify-center"
    )}
    {...attributes}
    {...listeners}
  >
    <Grip className="h-4 w-4 text-muted-foreground" />
  </div>
);
