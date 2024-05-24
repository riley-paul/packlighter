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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/lib/query";
import actions from "@/actions";
import useListId from "@/hooks/useListId";

interface Props {
  item: ItemsResponse;
}

const ItemImage: React.FC<Props> = (props) => {
  const { item } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const listId = useListId()

  const updateToastId = React.useRef<string | number | undefined>();
  const updateMutation = useMutation({
    mutationFn: (image: Blob) => actions.items.setImage({ id: item.id, image }),
    onMutate: () => {
      updateToastId.current = toast.loading("Updating image...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Items] });
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      toast.success("Image updated", { id: updateToastId.current });
    },
    onError: (error) => {
      toast.error(error.message, { id: updateToastId.current });
    },
  });

  const deleteToastId = React.useRef<string | number | undefined>();
  const deleteMutation = useMutation({
    mutationFn: () => actions.items.deleteImage(item.id),
    onMutate: () => {
      deleteToastId.current = toast.loading("Deleting image...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.Items] });
      queryClient.invalidateQueries({ queryKey: [Collections.Lists, listId] });
      toast.success("Image deleted", { id: deleteToastId.current });
    },
    onError: (error) => {
      toast.error(error.message, { id: deleteToastId.current });
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
      <DialogTrigger className="h-full flex">
        <div
          className={cn(
            "flex w-16 flex-1 items-center justify-center rounded-sm p-0.5",
            item.image ? "h-16 bg-white" : "bg-muted/50 h-full",
            "outline-1 transition-all hover:outline outline-primary outline-offset-1"
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
            Choose a file or paste an image to update the image for this item
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
            disabled={deleteMutation.isPending}
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
