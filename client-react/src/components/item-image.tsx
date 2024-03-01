import React from "react";
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
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Collections, ItemsResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { pb } from "@/lib/pocketbase";
import { useMutation } from "react-query";
import { deleteItemImage, setItemImage } from "@/api/item";
import { toast } from "sonner";
import { queryClient } from "@/lib/query";
import { useParams } from "react-router-dom";

interface Props {
  item: ItemsResponse;
}

const ItemImage: React.FC<Props> = (props) => {
  const { item } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const { listId } = useParams();

  const updateMutation = useMutation({
    mutationFn: (image: Blob) => setItemImage({ id: item.id, image }),
    onSuccess: () => {
      toast.success(`${item.name} image updated`);
      queryClient.invalidateQueries([Collections.Items]);
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteItemImage(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Items]);
      queryClient.invalidateQueries([Collections.Lists, listId]);
      toast.success(`${item.name} image deleted`);
    },
  });

  React.useEffect(() => {
    const pasteFiles = (e: ClipboardEvent) => {
      if (isOpen && e.clipboardData?.files?.length) {
        updateMutation.mutate(e.clipboardData.files[0]);
      }
    };

    document.addEventListener("paste", pasteFiles);
    return () => {
      document.removeEventListener("paste", pasteFiles);
    };
  }, [isOpen, updateMutation]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-full">
        <div
          className={cn(
            "flex w-16 flex-1 items-center justify-center rounded-sm p-0.5",
            item.image ? "aspect-square bg-white" : "bg-muted/50 h-full",
            "outline-1 transition-all hover:outline"
          )}
        >
          {item.image && (
            <img
              className="h-full w-full object-contain"
              src={pb.files.getUrl(item, item.image, { thumb: "80x80" })}
              alt={item.name}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader className="text-left">
          <DialogTitle>Update {item.name} Image</DialogTitle>
          <DialogDescription>
            Upload or provide a link to an image
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files) {
              updateMutation.mutate(target.files[0]);
            }
          }}
        />

        <div
          className={cn(
            "text-muted-foreground flex aspect-square items-center justify-center rounded-md p-2",
            item.image ? "bg-white" : "bg-muted"
          )}
        >
          {item.image ? (
            <img
              className="h-full w-full object-contain"
              src={pb.files.getUrl(item, item.image, { thumb: "500x500" })}
              alt={item.name}
            />
          ) : (
            "No Image"
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteMutation.isLoading}
            onClick={() => deleteMutation.mutate()}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Image
          </Button>
        </DialogFooter>
        <input type="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default ItemImage;
