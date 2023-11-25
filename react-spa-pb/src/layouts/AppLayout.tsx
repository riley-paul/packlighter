import { AccountDropdown } from "@/components/AccountDropdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDataQuery } from "@/hooks/useDataQuery";
import { pb } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";
import { Delete, Feather, Plus } from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  const { queryLists, createList, deleteList } = useDataQuery();

  return (
    <div className="overflow-hidden w-full h-screen flex">
      <aside className="border-r w-[250px] flex flex-col overflow-hidden">
        <Link to="/" className="flex items-center border-b h-14 p-4">
          <Feather className="mr-3 w-6 text-teal-500" />
          <h1 className="font-medium text-lg">PackLighter</h1>
        </Link>
        <div className="p-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium">Lists</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => createList.mutate({})}
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
                      "w-full pl-4 h-8 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between",
                      !list.name && "italic",
                      isActive &&
                        "border-l-4 border-teal-500 pl-3 text-foreground"
                    )
                  }
                >
                  {list.name || "Unnamed List"}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    onClick={(ev) => {
                      ev.preventDefault();
                      deleteList.mutate(list.id);
                    }}
                  >
                    <Delete className="h-4 w-4" />
                  </Button>
                </NavLink>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card text-foreground h-14 border-b shadow flex justify-end p-4 items-center">
          <AccountDropdown />
        </header>
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
