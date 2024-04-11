import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SelectPackingItem from "./select-packing-item";
import { CacheKeys } from "@/lib/query";
import { Input } from "../ui/input";
import type { ExpandedCategory, Item } from "@/db/schema";
import { trpc } from "@/client";

type Props = {
  category: ExpandedCategory;
};

const filterItems = (item: Item, query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return (
    item.name?.toLowerCase().includes(lowerCaseQuery) ||
    item.description?.toLowerCase().includes(lowerCaseQuery)
  );
};

const AddItemToCategoryDrawer: React.FC<Props> = (props) => {
  const { category } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [selection, setSelection] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState("");

  const itemsQuery = useQuery({
    queryKey: [CacheKeys.Items],
    queryFn: () => trpc.items.get.query(),
  });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setSelection([]);
        setSearch("");
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="linkMuted" size="sm">
          <Plus size="1rem" className="mr-2" />
          Add Item
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <header className="flex gap-2 justify-between items-center px-4 py-2">
          <DrawerTitle>
            Add {selection.length} item{selection.length === 1 ? "" : "s"} to{" "}
            {category.name ?? "Unnamed Category"}
          </DrawerTitle>
          <div className="flex items-center gap-2">
            <Button disabled={selection.length === 0}>
              <Plus size="1rem" className="mr-2" />
              Add
            </Button>
            <DrawerClose asChild>
              <Button size="icon" variant="secondary">
                <X />
              </Button>
            </DrawerClose>
          </div>
        </header>
        <section className="px-4 mb-2">
          <Input
            placeholder="Filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>
        <article className="overflow-auto mx-4 bg-card rounded-t-md">
          {itemsQuery.data
            ?.filter((i) => filterItems(i, search))
            .map((item) => (
              <SelectPackingItem
                key={item.id}
                item={item}
                selected={selection.includes(item.id)}
                onSelect={(id) => {
                  if (selection.includes(id)) {
                    setSelection(selection.filter((i) => i !== id));
                    return;
                  }
                  setSelection([...selection, id]);
                }}
              />
            ))}
        </article>
      </DrawerContent>
    </Drawer>
  );
};

export default AddItemToCategoryDrawer;
