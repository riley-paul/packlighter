import { Item } from "@/components/Item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataQuery } from "@/hooks/useDataQuery";
import { cn } from "@/lib/utils";
import { Delete, Feather, Plus } from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  const { queryLists, queryItems, createList, deleteList } = useDataQuery();
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="overflow-hidden w-full h-screen flex">
      <aside className="border-r w-[250px] grid grid-rows-[3.5rem_1fr_1fr] overflow-hidden bg-card text-foreground">
        <Link to="/" className="flex items-center border-b h-14 p-4">
          <Feather className="mr-3 w-6 text-accent-foreground" />
          <h1 className="font-medium text-lg">PackLighter</h1>
        </Link>
        <section className="overflow-hidden flex flex-col border-b">
          <div className="flex justify-between items-center p-2 pl-4">
            <h2 className="text-sm font-medium">Lists</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => createList.mutate({})}
            >
              <Plus className="mr-2 w-4" /> New List
            </Button>
          </div>
          <div className="grid gap-1 overflow-auto px-2">
            {queryLists.data?.map((list) => (
              <NavLink
                key={list.id}
                to={`/${list.id}`}
                className={({ isActive }) =>
                  cn(
                    "w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between",
                    !list.name && "italic",
                    isActive &&
                      "border-l-4 border-accent-foreground pl-3 text-foreground"
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
        </section>
        <section className="overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 p-2 pl-4">
            <h2 className="text-sm font-medium">Items</h2>
            <Input
              type="search"
              className="text-sm h-auto"
              placeholder="Search..."
              value={searchTerm}
              onChange={(ev) => setSearchTerm(ev.target.value)}
            />
          </div>
          <div className="grid gap-2 overflow-auto pl-4 p-2">
            {queryItems.data
              ?.filter(
                (i) =>
                  i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  i.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <Item key={item.id} item={item} />
              ))}
          </div>
        </section>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
