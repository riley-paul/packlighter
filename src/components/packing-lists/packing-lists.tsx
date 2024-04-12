import { Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import PackingList from "./packing-list";

import { cn } from "@/lib/utils";
import useAppStore from "@/store";

export default function PackingLists(): ReturnType<React.FC> {
  const { lists, listCreate } = useAppStore();

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <header className="flex items-center justify-between">
        <span className="font-semibold text-sm">Lists</span>
        <Button size="sm" variant="linkMuted" onClick={listCreate}>
          <Plus size="1rem" className="mr-2" />
          Add List
        </Button>
      </header>
      <Card
        className={cn(
          "py-2 h-full overflow-y-auto overflow-x-hidden transition-colors"
        )}
      >
        {lists.map((list) => (
          <PackingList key={list.id} list={list} />
        ))}
      </Card>
    </div>
  );
}
