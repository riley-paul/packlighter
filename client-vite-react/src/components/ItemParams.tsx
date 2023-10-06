import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ItemType } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

export const ItemParams: React.FC<{ item: ItemType }> = ({ item }) => {
  const { updateItem } = useAppStore((state) => ({
    updateItem: state.updateItem,
  }));

  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <div className="flex flex-col text-left h-full">
          <div className="flex w-full justify-between items-center gap-2">
            <span className={cn(!item.name && "opacity-50")}>
              {item.name || "Unnamed Gear"}
            </span>
            <span className="text-muted-foreground">{item.weight_g}g</span>
          </div>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-4">
        <form action="" className="grid gap-4">
          <DialogHeader className="text-left">
            <DialogTitle>Update Gear</DialogTitle>
            <DialogDescription>Modify gear information</DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(item.id, { name: e.target.value })}
            placeholder="Name"
          />
          <Textarea
            value={item.description}
            onChange={(e) =>
              updateItem(item.id, { description: e.target.value })
            }
            placeholder="Description"
          />
          <Input
            type="number"
            value={item.weight_g}
            onChange={(e) =>
              updateItem(item.id, { weight_g: Number(e.target.value) })
            }
            placeholder="Weight (g)"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
