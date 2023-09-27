import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  initialValue: string;
  updateValue: (value: string) => void;
  className?: string;
}

export const EditableDiv: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(props.initialValue);

  return (
    <input
      className={cn("bg-background text-foreground",props.className)}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => props.updateValue(value)}
    >
      {value}
    </input>
  );
};
