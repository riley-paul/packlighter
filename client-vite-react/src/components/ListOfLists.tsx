import { Button } from "@/components/ui/button";
import type { RecordModel } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  lists: RecordModel[];
}

export default function ListOfLists(props: Props) {
  const { lists } = props;
  return (
    <ScrollArea className="overflow-y-auto max-h-fit min-h-[200px] border rounded-md p-2 pr-3">
      <div className="grid gap-1">
        {lists.map((list) => {
          const href = `/${list.id}`;
          // const currentList =
          //   Astro.url.pathname === href || Astro.url.pathname === href + "/";
          return (
            <a key={list.id} href={href} className="w-full">
              <Button
                // variant={currentList ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  list.name ? "" : "opacity-50"
                }`}
              >
                {list.name || "Unnamed List"}
              </Button>
            </a>
          );
        })}
      </div>
    </ScrollArea>
  );
}
