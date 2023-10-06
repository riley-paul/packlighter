import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listSchema } from "@/lib/schema";
import { useAppStore } from "@/lib/store";
import { LoaderFunction, useLoaderData } from "react-router-dom";

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

  const { updateList, getList } = useAppStore((state) => ({
    updateList: state.updateList,
    getList: state.getList,
  }));

  const list = getList(id)!;

  return (
    <div className="grid gap-2">
      <Input
        className="font-medium text-xl h-auto text-teal-500"
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
  );
};
