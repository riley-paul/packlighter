import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Delete, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {}

export const ListList: React.FC<Props> = () => {
  const { queryLists, createList, deleteList } = useDataQuery();

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Lists</h2>
        <Button size="sm" variant="ghost" onClick={() => createList.mutate({})}>
          <Plus className="mr-2 w-4" /> New List
        </Button>
      </div>
      <div className="overflow-auto">
        {queryLists.data?.map((list) => (
          <NavLink
            key={list.id}
            to={`/${list.id}`}
            className={({ isActive }) =>
              cn(
                "w-full pl-4 group hover:border-l-4 hover:pl-3 text-muted-foreground flex items-center justify-between",
                !list.name && "italic",
                isActive &&
                  "border-l-4 border-primary pl-3 text-foreground"
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
    </div>
  );
};
