import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import React from "react";

type Props = {
  isGrabbing?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Gripper: React.FC<Props> = (props) => {
  const { isGrabbing, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "text-muted-foreground hover:text-foreground cursor-grab transition-colors",
        isGrabbing && "cursor-grabbing"
      )}
    >
      <GripVertical size="1rem" />
    </div>
  );
};

export default Gripper;
