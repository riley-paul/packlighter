import { useAppStore } from "@/lib/store";
import { Link } from "react-router-dom";

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
      <ul>
        {lists.map((list) => (
          <Link to={`/${list.id}`}>{list.name || "Unnamed List"}</Link>
        ))}
      </ul>
    </div>
  );
};
