import React from "react";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { ItemType } from "@/lib/schema";
import { useAppStore } from "@/lib/store";

export const ItemImage: React.FC<{ item: ItemType }> = ({ item }) => {
  const [url, setUrl] = React.useState(item.image_url);
  const { updateItem } = useAppStore((state) => ({
    updateItem: state.updateItem,
  }));

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "h-16 p-0.5 aspect-square rounded-sm flex justify-center items-center",
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
        <form action="" className="grid gap-4">
          <DialogHeader className="text-left">
            <DialogTitle>Update Image</DialogTitle>
            <DialogDescription>Provide a link to an image</DialogDescription>
          </DialogHeader>
          <Input
            name="image_url"
            type="url"
            placeholder="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
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
            <DialogTrigger
              className={buttonVariants()}
              disabled={url === item.image_url}
              onClick={() => updateItem(item.id, { image_url: url })}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
