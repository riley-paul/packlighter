import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useDataQuery } from "@/hooks/useDataQuery";
import { useParams } from "react-router-dom";

interface Props {
  listName: string;
}

export const ListName: React.FC<Props> = ({ listName }) => {
  const { updateList } = useDataQuery();
  const { listId } = useParams();

  const methods = useForm({
    values: { name: listName },
  });

  if (!listId) return <div />;

  const { handleSubmit, control } = methods;

  const saveList = (data: { name: string }) => {
    const { name } = data;
    updateList.mutate({ id: listId, data: { name } });
  };

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
