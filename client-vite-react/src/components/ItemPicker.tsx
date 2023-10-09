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
import { useAppStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export const ItemPicker: React.FC = () => {
  const items = useAppStore((state) => state.items);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search Gear..." />
          <CommandEmpty className="p-2">
            <Button className="w-full" size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Gear
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem key={item.id}>
                {item.name || "Unnamed Gear"}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
