import { AccountDropdown } from "@/components/AccountDropdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLists } from "@/hooks/useLists";
import { pb } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import { Feather, Plus } from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  const { queryLists, createList } = useLists();

  return (
    <main className="overflow-hidden w-full h-screen flex flex-col">
      <header className="bg-card text-foreground h-14 border-b shadow">
        <div className="flex px-4 justify-between items-center h-full">
          <Link to="/" className="flex items-center w-[250px] border-r h-full">
            <Feather className="mr-3 w-6 text-teal-500" />
            <h1 className="font-medium text-lg">PackLighter</h1>
          </Link>
          <AccountDropdown />
        </div>
      </header>
      <div className="flex flex-1 px-4 overflow-hidden">
        <aside className="border-r w-[250px] py-2 pr-2 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">Lists</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                createList.mutate({ user: pb.authStore.model?.id })
              }
            >
              <Plus className="mr-2 w-4" /> New List
            </Button>
          </div>
          <ScrollArea>
            <div className="grid gap-1">
              {queryLists.data?.map((list) => (
                <NavLink
                  key={list.id}
                  to={`/${list.id}`}
                  className={({ isActive }) =>
                    cn(
                      "block w-full px-4 py-1 hover:border-l-4 hover:pl-3 text-muted-foreground",
                      !list.name && "italic",
                      isActive &&
                        "border-l-4 border-teal-500 pl-3 text-foreground"
                    )
                  }
                >
                  {list.name || "Unnamed List"}
                </NavLink>
              ))}
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
