import { Button } from "@/components/ui/button";
import type { Record } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  lists: Record[];
  selectedList: string;
  setSelectedList: Dispatch<SetStateAction<string>>;
}

export const ListOfLists: React.FC<Props> = (props) => {
  const { lists, selectedList, setSelectedList } = props;
  return (
    <ScrollArea className="overflow-y-auto max-h-fit min-h-[200px] border rounded-md p-2 pr-3">
      <div className="grid gap-1">
        {lists.map((list) => (
          <Button
            key={list.id}
            variant={selectedList === list.id ? "secondary" : "ghost"}
            className={`w-full justify-start ${list.name ? "" : "opacity-50"}`}
            onClick={() => setSelectedList(list.id)}
          >
            {list.name || "Unnamed List"}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
