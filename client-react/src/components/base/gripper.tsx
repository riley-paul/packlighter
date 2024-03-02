import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import React from "react";

type Props = {
  isGrabbing?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Gripper: React.FC<Props> = (props) => {
  const { isGrabbing, disabled, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "text-muted-foreground hover:text-foreground cursor-grab transition-colors",
        isGrabbing && "cursor-grabbing",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <GripVertical size="1rem" />
    </div>
  );
};

export default Gripper;
