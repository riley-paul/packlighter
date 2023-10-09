import { Grabber } from "@/components/Grabber";
import { ItemImage } from "@/components/ItemImage";
import { ItemMenu } from "@/components/ItemMenu";
import { ItemParams } from "@/components/ItemParams";
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
    <div className="grid gap-2">
      <h2 className="font-medium text-lg">All Gear</h2>
      <Input type="search" placeholder="Search..." />
      <div className="grid divide-y">
        {items.map((item) => (
          <div className="flex gap-2 p-2 hover:bg-muted/50 transition-colors">
            <Grabber />
            <ItemImage item={item} />
            <ItemParams item={item} />
            <ItemMenu item={item} />
          </div>
        ))}
      </div>
      <Button onClick={() => addItem()} variant="ghost">
        <Plus className="h-4 w-4 mr-2" /> Add Gear
      </Button>
    </div>
  );
};
