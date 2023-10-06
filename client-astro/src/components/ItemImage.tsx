import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import React from "react";

import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import type { ItemType } from "@/lib/schema";

interface Props {
  item: ItemType;
}

export const ItemImage: React.FC<Props> = ({ item }) => {
  const [url, setUrl] = React.useState(item.image_url);
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "h-12 p-0.5 aspect-square rounded-sm flex justify-center items-center",
            item.image_url ? "bg-white" : "bg-muted"
          )}
        >
          {item.image_url && (
            <img
              className="h-full w-full object-contain"
              src={item.image_url}
              alt={item.name}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="p-4">
        <form action="/gear?/updateItem" method="post" className="grid gap-4">
          <input type="hidden" name="id" value={item.id} />
          <DialogHeader className="text-left">
            <DialogTitle>Update Image</DialogTitle>
            <DialogDescription>Provide a link to an image</DialogDescription>
          </DialogHeader>
          <Input name="image_url" type="url" placeholder="Image URL" />
          {url ? (
            <div className="bg-white rounded-md p-2 flex items-center aspect-square justify-center">
              <img
                className="object-contain h-full w-full"
                src={url}
                alt={item.name}
              />
            </div>
          ) : (
            <div className="rounded-md bg-muted w-full p-4 flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={url === item.image_url}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
