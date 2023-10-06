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
  const list = listSchema.parse(loaderData);
  return (
    <div>
      <h1>{list.name}</h1>
    </div>
  );
};
