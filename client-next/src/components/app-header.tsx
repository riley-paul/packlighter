import React from "react";
import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";

type Props = React.PropsWithChildren;

export default function AppHeader(props: Props): ReturnType<React.FC<Props>> {
  const { children } = props;
  return (
    <header className="flex h-14 items-center border-b">
      <div className="flex w-full items-center gap-4 p-4">
        <div className="flex flex-1 items-center justify-between">
          {children}
        </div>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
}
