import type { BaseModel, RecordModel } from "pocketbase";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, Trash } from "lucide-react";

interface Props {
  initialList: RecordModel;
}

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const ListHeader: React.FC<Props> = (props) => {
  const methods = useForm({
    defaultValues: props.initialList,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: BaseModel) =>
    fetch(`/api/lists/${props.initialList.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then(() => console.log("list updated"))
      .catch(() => console.log("list not updated"));

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
              className="font-bold text-teal-400 text-lg"
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
      <form method="POST" action={`/api/lists/${props.initialList.id}/delete`}>
        <Button size="icon" variant="destructive" className="h-full">
          <Trash className="w-4" />
        </Button>
      </form>
    </div>
  );
};