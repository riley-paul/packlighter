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
import { useDataQuery } from "@/hooks/useDataQuery";
import { useForm } from "react-hook-form";
import { RecordModel } from "pocketbase";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";

interface Props {
  item: RecordModel;
}

const schema = z.object({
  image_url: z.string().url(),
});

export const ItemImage: React.FC<Props> = (props) => {
  const { item } = props;
  const { updateItem } = useDataQuery();
  const { toast } = useToast();

  const methods = useForm({
    resolver: zodResolver(schema),
    values: item,
  });

  const { handleSubmit, control, watch } = methods;

  const saveImage = (data: RecordModel) => {
    const { image_url } = data;
    updateItem.mutate({ id: item.id, data: { image_url } });
    toast({ title: "Image Updated" });
  };

  const watchedUrl: string | undefined = watch("image_url");

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "h-24 p-0.5 aspect-square rounded-sm flex justify-center items-center",
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
        <DialogHeader className="text-left">
          <DialogTitle>Update Image</DialogTitle>
          <DialogDescription>Provide a link to an image</DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(saveImage)} className="grid gap-4">
            <FormField
              control={control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="url" placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedUrl ? (
              <div className="bg-white rounded-md p-2 flex items-center aspect-square justify-center">
                <img
                  className="object-contain h-full w-full"
                  src={watchedUrl}
                  alt={item.name}
                />
              </div>
            ) : (
              <div className="rounded-md bg-muted w-full p-4 flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            <DialogFooter>
              <DialogTrigger className={buttonVariants()} type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save
              </DialogTrigger>
            </DialogFooter>
            <input type="hidden" />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
