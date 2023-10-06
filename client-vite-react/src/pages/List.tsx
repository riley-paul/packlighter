import { Grabber } from "@/components/Grabber";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listSchema } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { Delete, MoreVertical, Plus } from "lucide-react";
import { LoaderFunction, useLoaderData } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

  const { updateList, getList, removeCategory, addCategory, updateCategory } =
    useAppStore((state) => ({
      updateList: state.updateList,
      getList: state.getList,
      removeCategory: state.removeCategory,
      addCategory: state.addCategory,
      updateCategory: state.updateCategory,
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
        <div className="grid">
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 border-b pb-2">
            <Grabber />
            <Input
              type="text"
              value={category.name}
              placeholder="Unnamed Category"
              className="text-md border-none px-1 py-0.5 h-auto font-medium"
              onChange={(e) =>
                updateCategory(list.id, category.id, { name: e.target.value })
              }
            />
            <Button size="icon" className="h-full w-7">
              <Plus className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-full w-7"
                )}
              >
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() => removeCategory(list.id, category.id)}
                >
                  Delete
                  <DropdownMenuShortcut>
                    <Delete className="h-4 w-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          items
        </div>
      ))}
      <Button
        variant="secondary"
        size="sm"
        className="justify-start"
        onClick={() => addCategory(list.id)}
      >
        <Plus className="h-4 w-4 mr-2" /> Add Category
      </Button>
    </div>
  );
};
