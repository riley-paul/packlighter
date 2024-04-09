import React from "react";

type Props = React.PropsWithChildren;

export default function FormActionContainer(
  props: Props
): ReturnType<React.FC<Props>> {
  const { children } = props;
  const numChildren = React.Children.count(children);
  return (
    <div
      className="grid w-full mt-6"
      style={{ gridTemplateColumns: `repeat(${numChildren}, 1fr)` }}
    >
      {children}
    </div>
  );
}
