import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { Plus } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { Item } from "./Item";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";

type Props = {
  category: ExpandedCategory;
};

export const AddItem: React.FC<Props> = (props) => {
  const { category } = props;
  const { queryItems, createCategoryItem } = useDataQuery();

  const itemIds = category.items.map((i) => i.itemData.id);

  return (
    <Popover>
      <PopoverTrigger
        className={buttonVariants({ variant: "linkMuted", size: "sm" })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden h-96 p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandEmpty>No item found</CommandEmpty>
          <CommandGroup className="overflow-auto">
            {queryItems.data
              ?.filter((i) => !itemIds.includes(i.id))
              .map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(value) =>
                    createCategoryItem.mutate({
                      category: category.id,
                      item: value,
                    })
                  }
                >
                  <Item item={item} />
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
