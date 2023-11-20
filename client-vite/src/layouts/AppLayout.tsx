import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Feather, Plus } from "lucide-react";
import React from "react";
import { Link, LoaderFunction, Outlet } from "react-router-dom";

export const loader: LoaderFunction = async () => {
  console.log("AppLayout loader");
  return null;
};

export const Component: React.FC = () => {
  return (
    <main className="overflow-hidden w-full h-screen flex flex-col">
      <header className="bg-card text-foreground h-14 border-b shadow">
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="flex items-center px-4 w-[250px] border-r h-full"
          >
            <Feather className="mr-3 w-6 text-teal-500" />
            <h1 className="font-medium text-lg">PackLighter</h1>
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="border-r w-[250px] py-2 pr-2 pl-4 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">Lists</h2>
            <Button variant="ghost" size="sm">
              <Plus className="mr-2 w-4" /> New List
            </Button>
          </div>
          <ScrollArea>
            <div className="grid gap-1">
              {/* {
              lists.map((list) => (
                <a
                href={`/${list.id}`}
                className={cn(
                  "block w-full px-4 py-1 hover:border-l-4 hover:pl-3 text-muted-foreground",
                  !list.name && "italic",
                  Astro.url.pathname === `/${list.id}` &&
                  "border-l-4 border-teal-500 pl-3 text-foreground"
                  )}
                  >
                  {list.name || "Unnamed List"}
                  </a>
                  ))
                } */}
            </div>
          </ScrollArea>
        </aside>
        <div className="flex-1 pl-4 py-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
