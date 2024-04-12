import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren<{
  horizontal?: boolean;
}>;

export default function FormInputContainer(
  props: Props
): ReturnType<React.FC<Props>> {
  const { children, horizontal } = props;
  const numChildren = React.Children.count(children);

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${numChildren}, 1fr)` }}
      className={cn("flex flex-col gap-2", horizontal && "grid")}
    >
      {children}
    </div>
  );
}
