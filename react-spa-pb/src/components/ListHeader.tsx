import type { RecordModel } from "pocketbase";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListWithCategories, useDataQuery } from "@/hooks/useDataQuery";

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

interface Props {
  listId: string;
  list: ListWithCategories;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { listId, list } = props;
  const { deleteList, updateList } = useDataQuery(listId);

  const methods = useForm({
    resolver: zodResolver(schema),
    values: list,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: RecordModel) =>
    updateList.mutate({ id: listId ?? "", data });

  return (
    <div className="flex gap-4">
      <form
        onBlur={handleSubmit(saveList)}
        onSubmit={handleSubmit(saveList)}
        className="space-y-2 flex-1"
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Unnamed List"
              className="font-bold text-accent-foreground text-xl h-auto"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea {...field} placeholder="Description" />
          )}
        />
        <input type="hidden" />
      </form>
      <div>
        <Button
          size="icon"
          variant="destructive"
          className="h-full"
          onClick={() => deleteList.mutate(listId)}
        >
          <Trash className="w-4" />
        </Button>
      </div>
    </div>
  );
};
