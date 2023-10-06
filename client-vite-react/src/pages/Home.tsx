import { useAppStore } from "@/lib/store";

export const Component: React.FC = () => {
  const { items, lists } = useAppStore((state) => ({
    items: state.items,
    lists: state.lists,
  }));

  return (
    <div>
      <h1>Home</h1>
      <p>Items: {items.length}</p>
      <p>Lists: {lists.length}</p>
    </div>
  );
};
