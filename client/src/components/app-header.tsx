import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import UserAvatar from "./user-avatar.tsx";

type Props = React.PropsWithChildren;

export default function AppHeader(props: Props): ReturnType<React.FC<Props>> {
  const { children } = props;
  const { isSidebarOpen, toggleSidebar } = useStore();

  return (
    <header className="flex h-14 items-center border-b">
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-none transition-all",
          isSidebarOpen && "w-0"
        )}
        variant="ghost"
        onClick={() => toggleSidebar()}
      >
        <Menu size="1.2rem" />
      </Button>
      <div className="flex w-full items-center gap-4 p-4">
        <div className="flex flex-1 items-center justify-between">
          {children}
        </div>
        <UserAvatar />
      </div>
    </header>
  );
}
