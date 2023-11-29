import type { RecordModel } from "pocketbase";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ListWithCategories, useDataQuery } from "@/hooks/useDataQuery";
import { Input } from "./ui/input";
import { ListSettings } from "./ListSettings";

interface Props {
  list: ListWithCategories;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { list } = props;
  const { deleteList, updateList } = useDataQuery();

  const methods = useForm({
    values: list,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: RecordModel) =>
    updateList.mutate({ id: list.id, data });

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
              className="h-auto text-3xl text-accent-foreground font-medium"
              placeholder="List Name"
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
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="destructive"
          className="h-full"
          onClick={() => deleteList.mutate(list.id)}
        >
          <Trash className="w-4" />
        </Button>
        <ListSettings list={list} />
      </div>
    </div>
  );
};
