import type { RecordModel } from "pocketbase";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ListWithCategories, useDataQuery } from "@/hooks/useDataQuery";
import { useParams } from "react-router-dom";

interface Props {
  list: ListWithCategories;
}

export const ListName: React.FC<Props> = (props) => {
  const { list } = props;
  const { updateList } = useDataQuery();
  const { listId } = useParams();

  const methods = useForm({
    values: list,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: RecordModel) => {
    const { name } = data;
    updateList.mutate({ id: list.id, data: { name } });
  };

  if (!listId ) return <div />;

  return (
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
            className="font-bold text-accent-foreground text-xl h-auto border-none shadow-none"
          />
        )}
      />
      <input type="hidden" />
    </form>
  );
};
