import type { RecordModel } from "pocketbase";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { pb } from "@/lib/pocketbase";

const schema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const list = await pb.collection("lists").getOne(params.listId ?? "");
    return { list };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const Component: React.FC = () => {
  const { list } = useLoaderData() as { list: RecordModel };

  const methods = useForm({
    resolver: zodResolver(schema),
    values: list,
  });

  const { handleSubmit, control } = methods;

  const saveList = (data: RecordModel) => console.log(data);

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
      <form method="POST" action={`/api/lists/${list.id}/delete`}>
        <Button size="icon" variant="destructive" className="h-full">
          <Trash className="w-4" />
        </Button>
      </form>
    </div>
  );
};
