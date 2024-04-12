import AppHeader from "@/components/app-header";
import ErrorReport from "@/components/base/error";
import ServerInput from "@/components/input/server-input";
import ListSettings from "@/components/list-settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import ServerTextarea from "@/components/input/server-textarea";
import ListCategory from "@/components/list-category/list-category";
import useAppStore from "@/store";

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();

  const { listGet, listUpdate, categoryCreate } = useAppStore();

  const list = listGet(listId);

  if (!list) {
    const error = new Error("List not found");
    return (
      <div className="h-full">
        <AppHeader />
        <ErrorReport error={error} showGoHome />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader>
        <h1 className={cn("text-lg font-bold flex-1")}>
          <ServerInput
            key={list.id}
            currentValue={list.name}
            placeholder="Unnamed List"
            className="text-lg font-bold w-full border-none bg-transparent shadow-none placeholder:italic"
            onUpdate={(v) => listUpdate(list.id, { name: v })}
          />
        </h1>
        <ListSettings list={list} />
      </AppHeader>
      <section className="overflow-y-auto flex-1">
        <div className="p-4 flex flex-col gap-4">
          <ServerTextarea
            key={list.id}
            className="bg-card"
            placeholder="List Description"
            currentValue={list.description}
            onUpdate={(v) => listUpdate(list.id, { description: v })}
          />

          {list.categories.map((category) => (
            <ListCategory key={category.id} category={category} list={list} />
          ))}

          <Button
            variant="linkMuted"
            size="sm"
            className="w-min ml-2"
            onClick={() => categoryCreate(list.id)}
          >
            <Plus size="1rem" className="mr-2" />
            Add Category
          </Button>
        </div>
      </section>
    </div>
  );
}
