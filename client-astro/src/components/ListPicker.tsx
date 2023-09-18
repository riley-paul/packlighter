import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Record } from "pocketbase";

interface Props {
  lists: Record[];
  currentListId: string;
}

export const ListPicker: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const newListRef = React.useRef<HTMLFormElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {props.lists.find((list) => list.id === props.currentListId)?.name ||
            "Unnamed List"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-1 bg-card">
        <Command>
          <CommandInput placeholder="Search lists..." />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup>
            <form
              action={`/api/lists`}
              id="createList"
              className="font-medium"
              method="post"
              ref={newListRef}
            >
              <CommandItem
                key="create"
                onSelect={(currentValue) => {
                  newListRef.current?.submit();
                  setOpen(false);
                }}
              >
                <Plus className={cn("mr-2 h-4 w-4")} />
                New List...
              </CommandItem>
            </form>
            {props.lists.map((list) => (
              <CommandItem
                key={list.id}
                value={list.id}
                onSelect={(currentValue) => {
                  window.location.href = `/${currentValue}`;
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    list.id === props.currentListId
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <span
                  className={cn({
                    "opacity-50": !list.name,
                  })}
                >
                  {list.name || "Unnamed List"}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
