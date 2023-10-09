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
import { Button, buttonVariants } from "./ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  listId: string;
  categoryId: string;
}

export const ItemPicker: React.FC<Props> = (props) => {
  const { listId, categoryId } = props;
  const { items, addListItem, getList } = useAppStore((state) => ({
    getList: state.getList,
    items: state.items,
    addListItem: state.addListItem,
  }));

  const list = getList(listId)!;
  const listItemIds = list.categories
    .map((cat) => cat.items.map((i) => i.itemId))
    .flat(2);
  const itemList = items.filter((i) => !listItemIds.includes(i.id));

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "h-8 w-10"
        )}
      >
        <Plus className="h-4 w-4" />
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
                    addListItem(listId, categoryId, item.id);
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
