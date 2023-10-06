import { useAppStore } from "@/lib/store";
import { LoaderFunction, useLoaderData } from "react-router-dom";

export const loader: LoaderFunction = () => {
  const items = useAppStore.getState().items;
  const lists = useAppStore.getState().lists;
  return { items, lists };
};

export const Component: React.FC = () => {
  const { items, lists } = useLoaderData();

  return <div>hello from home</div>;
};
