import { Button } from "@/components/ui/button";
import type { Record } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";
import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface Props {
  lists: Record[];
  currentListId: string;
}

export const ListOfLists: React.FC<Props> = (props) => {
  const { lists, currentListId } = props;
  return (
    <ScrollArea className="overflow-y-auto max-h-fit min-h-[200px] border rounded-md p-2 pr-3">
      <div className="grid gap-1">
        {lists.map((list) => (
          <a href={`/${list.id}`}>
            <Button
              size="sm"
              key={list.id}
              variant={currentListId === list.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", {
                "opacity-50": !list.name,
              })}
            >
              {list.name || "Unnamed List"}
            </Button>
          </a>
        ))}
      </div>
    </ScrollArea>
  );
};
