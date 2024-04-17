import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import React from "react";
import Logo from "./logo";
import PackingItems from "./packing-items/packing-items";
import PackingLists from "./packing-lists/packing-lists";
import { Button } from "./ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable";
import { useStore } from "@/lib/store";
import { useMediaQuery } from "usehooks-ts";
import { MOBILE_MEDIA_QUERY } from "@/lib/constants";

const SideBar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useStore();

  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  if (isMobile) {
    return (
      <>
        <aside
          className={cn(
            "border-r w-[300px] flex flex-col transition-all overflow-hidden absolute top-0 left-0 h-full z-50 bg-background",
            !isSidebarOpen && "w-0 border-none"
          )}
        >
          <header className="border-b h-14 flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "rounded-none h-14 w-14 transition-all flex-shrink-0 overflow-hidden"
              )}
              onClick={() => toggleSidebar()}
            >
              <Menu size="1.2rem" className="flex-shrink-0" />
            </Button>
            <Logo />
          </header>
          <ResizablePanelGroup autoSaveId="sidebar-panels" direction="vertical">
            <ResizablePanel defaultSize={40}>
              <PackingLists />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <PackingItems />
            </ResizablePanel>
          </ResizablePanelGroup>
        </aside>
        {isSidebarOpen && (
          <div
            onClick={() => toggleSidebar(false)}
            className="bg-muted/50 absolute inset-0 z-40"
          />
        )}
      </>
    );
  }

  return (
    <aside
      className={cn(
        "border-r w-[300px] flex flex-col transition-all overflow-hidden",
        !isSidebarOpen && "w-0 border-none"
      )}
    >
      <header className="border-b h-14 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "rounded-none h-14 w-14 transition-all flex-shrink-0 overflow-hidden"
          )}
          onClick={() => toggleSidebar()}
        >
          <Menu size="1.2rem" className="flex-shrink-0" />
        </Button>
        <Logo />
      </header>
      <ResizablePanelGroup autoSaveId="sidebar-panels" direction="vertical">
        <ResizablePanel defaultSize={40}>
          <PackingLists />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <PackingItems />
        </ResizablePanel>
      </ResizablePanelGroup>
    </aside>
  );
};

export default SideBar;
