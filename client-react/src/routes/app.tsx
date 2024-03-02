import Logo from "@/components/logo";
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
import { Menu } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

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
              "rounded-none h-14 w-14 transition-all flex-shrink-0 overflow-hidden",
            )}
            onClick={() => toggleSidebar()}
          >
            <Menu size="1.2rem" className="flex-shrink-0" />
          </Button>
          <Logo />
        </header>
        <ResizablePanelGroup autoSaveId="sidebar" direction="vertical">
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
