import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listSchema } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Plus } from "lucide-react";
import { LoaderFunction, useLoaderData } from "react-router-dom";

import { Category } from "@/components/Category";

export const loader: LoaderFunction = ({ params }) => {
  const { getList } = useAppStore.getState();
  const list = getList(params.id ?? "");
  if (!list) {
    throw new Response("Not Found", { status: 404 });
  }
  return list;
};

export const Component: React.FC = () => {
  const loaderData = useLoaderData();
  const { id } = listSchema.parse(loaderData);

  const { updateList, getList, addCategory } = useAppStore((state) => ({
    updateList: state.updateList,
    getList: state.getList,
    addCategory: state.addCategory,
  }));

  const list = getList(id)!;

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Input
          className="font-bold text-xl h-auto text-teal-500"
          value={list.name}
          placeholder="List Name"
          onChange={(e) => updateList(id, { name: e.target.value })}
        />
        <Textarea
          rows={3}
          placeholder="List Description"
          value={list.description}
          onChange={(e) => updateList(id, { description: e.target.value })}
        />
      </div>
      {list.categories.map((category) => (
        <Category key={category.id} listId={id} category={category} />
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="justify-start"
        onClick={() => addCategory(list.id)}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Category
      </Button>
    </div>
  );
};
