import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "@/lib/store";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { CategoryType } from "@/lib/schema";

interface Props {
  listId: string;
  category: CategoryType;
}

export const ItemPicker: React.FC<Props> = (props) => {
  const { listId, category } = props;
  const { items, addListItem } = useAppStore((state) => ({
    items: state.items,
    addListItem: state.addListItem,
  }));

  const categoryItemIds = category.items.map((i) => i.itemId);
  const itemList = items.filter((i) => !categoryItemIds.includes(i.id));

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
          <CommandList>
            <CommandGroup>
              {itemList.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    addListItem(listId, category.id, item.id);
                  }}
                >
                  {item.name || "Unnamed Gear"}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
