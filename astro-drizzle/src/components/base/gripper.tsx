import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import React from "react";

type Props = {
  isGrabbing?: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Gripper: React.FC<Props> = (props) => {
  const { isGrabbing, disabled, ...rest } = props;

  return (
    <button
      {...(disabled ? { disabled: true } : rest)}
      className={cn(
        "flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab transition-colors",
        isGrabbing && "cursor-grabbing",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <GripVertical size="1rem" />
    </button>
  );
};

export default Gripper;
