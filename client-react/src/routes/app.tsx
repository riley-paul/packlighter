import PackingItems from "@/components/packing-items";
import PackingLists from "@/components/packing-lists";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Feather, Menu } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App(): ReturnType<React.FC> {
  const { isSidebarOpen, toggleSidebar } = useStore();
  return (
    <div className="flex w-full h-full">
      <aside
        className={cn(
          "border-r w-[300px] h-screen flex flex-col transition-all overflow-hidden",
          !isSidebarOpen && "w-0 border-none"
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
            onClick={() => toggleSidebar()}
          >
            <Menu size="1.2rem" />
          </Button>
          <Link to="/" className="flex gap-2 items-center px-2">
            <Feather size="1.5rem" className="text-primary" />
            <span className="text-md">PackLighter</span>
          </Link>
        </header>
        <ResizablePanelGroup
          autoSaveId="sidebar"
          direction="vertical"
        >
          <ResizablePanel defaultSize={40}>
            <PackingLists />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <PackingItems />
          </ResizablePanel>
        </ResizablePanelGroup>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
