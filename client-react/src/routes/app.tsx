import PackingItems from "@/components/packing-items";
import PackingLists from "@/components/packing-lists";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Feather, Menu } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function App(): ReturnType<React.FC> {
  const { isSidebarOpen, toggleSidebar } = useStore();
  return (
    <div className="flex w-full h-full">
      <aside
        className={cn(
          "border-r w-[300px] h-screen flex flex-col transition-all overflow-hidden",
          !isSidebarOpen && "w-0"
        )}
      >
        <header className="border-b h-14 flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "rounded-none h-14 w-14 transition-all",
              !isSidebarOpen && "w-0"
            )}
            onClick={toggleSidebar}
          >
            <Menu size="1.2rem" />
          </Button>
          <div className="flex gap-2 items-center px-2">
            <Feather size="1.5rem" className="text-primary" />
            <span className="text-md">PackLighter</span>
          </div>
        </header>
        <PackingLists />
        <Separator />
        <PackingItems />
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
