import type { RecordModel } from "pocketbase";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ListWithCategories, useDataQuery } from "@/hooks/useDataQuery";
import { Input } from "./ui/input";
import { ListSettings } from "./ListSettings";

interface Props {
  list: ListWithCategories;
}

export const ListHeader: React.FC<Props> = (props) => {
  const { list } = props;
  const { updateList } = useDataQuery();

  const methods = useForm({
    values: list,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: RecordModel) =>
    updateList.mutate({ id: list.id, data });

  return (
    <div className="flex gap-2">
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
              className="h-auto text-3xl text-primary font-bold"
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
        <ListSettings list={list} />
      </div>
    </div>
  );
};
