import { LinkList } from "@/components/LinkList";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Component: React.FC = () => {
  const navigate = useNavigate();
  const { lists, addList, setLists } = useAppStore((state) => ({
    items: state.items,
    lists: state.lists,
    setLists: state.setLists,
    addList: state.addList,
  }));

  const gearLinks = [{ name: "All Gear", link: "/gear" }];

  return (
    <div>
      <span className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-medium">Lists</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const newList = addList();
            navigate(`/${newList.id}`);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New List
        </Button>
      </span>
      <LinkList
        items={lists}
        setItems={setLists}
        createLink={(list) => ({
          link: `/${list.id}`,
          name: list.name || "Unnamed List",
          class: list.name ? "" : "opacity-50",
        })}
      />
      <br />
      <h2 className="text-lg font-medium mb-2">Gear</h2>
      {/* <LinkList  links={gearLinks} /> */}
    </div>
  );
};
