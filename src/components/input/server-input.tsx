import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  currentValue: string | undefined;
  onUpdate: (value: string | undefined | undefined) => void;
  selectOnFocus?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function ServerInput(props: Props): ReturnType<React.FC<Props>> {
  const { currentValue, onUpdate, selectOnFocus, ...rest } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, setValue] = React.useState<string>(currentValue ?? "");

  const update = () => {
    if (value !== currentValue) onUpdate(value);
  };

  return (
    <Input
      {...rest}
      className={cn(
        props.className,
        "shadow-none border-none h-auto py-1 px-2 truncate placeholder:italic"
      )}
      ref={inputRef}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      onBlur={() => update()}
      onFocus={() => selectOnFocus && inputRef.current?.select()}
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === "Escape") {
          ev.preventDefault();
          update();
          inputRef.current?.blur();
        }
      }}
      autoComplete="off"
    />
  );
}
