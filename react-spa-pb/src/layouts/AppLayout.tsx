import { AccountEditor } from "@/components/AccountEditor";
import { ItemList } from "@/components/ItemList";
import { ListList } from "@/components/ListList";
import { ListListDrawer } from "@/components/ListListDrawer";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { cn } from "@/lib/utils";
import { Feather, MoreVertical } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  return (
    <div className="flex overflow-hidden h-screen">
      <aside
        className={cn(
          "border-r w-0 shadow-inner transition-all",
          isSidebarOpen && "w-[250px]",
          "flex flex-col overflow-hidden h-full"
        )}
      >
        <ItemList />
      </aside>
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="w-full border-b h-14 flex items-center bg-card shadow z-50">
          <div className="container flex justify-between">
            <div className="flex gap-4 items-center">
              <Toggle
                aria-label="Toggle sidebar"
                aria-checked={isSidebarOpen}
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "p-0"
                )}
              >
                <MoreVertical className="w-4 h-4" />
              </Toggle>
              <Link to="/" className="flex items-center">
                <Feather className="mr-2 w-6 text-primary" />
                <h1 className="font-medium text-lg">PackLighter</h1>
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              {isMobile && <ListListDrawer />}
              <AccountEditor />
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 py-6 overflow-auto">
          <div
            className={cn(
              "container",
              !isMobile && "gap-4 grid grid-cols-[1fr_250px]"
            )}
          >
            <Outlet />
            {!isMobile && (
              <aside className="h-fit">
                <ListList />
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
