import { Item } from "@/components/Item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { Plus } from "lucide-react";
import React from "react";

export const Component: React.FC = () => {
  const { items, addItem } = useAppStore((state) => ({
    items: state.items,
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateItem: state.updateItem,
  }));

  return (
    <>
      <h2 className="font-medium text-lg">All Gear</h2>
      <Input type="search" placeholder="Search..." />
      <div className="grid divide-y">
        {items.map((item) => (
          <Item item={item} />
        ))}
      </div>
      <br />
      <Button onClick={() => addItem()}>
        <Plus className="h-4 w-4 mr-2" /> Add Gear
      </Button>
    </>
  );
};
