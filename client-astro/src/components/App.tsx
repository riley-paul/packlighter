import PocketBase, { Record } from "pocketbase";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ListOfItems } from "./ListOfItems.tsx";
import { ListOfLists } from "./ListOfLists.tsx";
import { List, ListPlaceholder } from "./List.tsx";

interface Props {
  pb_auth: string;
  pb_url: string;
}

const App: React.FC<Props> = (props) => {
  const { pb_auth, pb_url } = props;

  const pb = new PocketBase(pb_url);
  pb.authStore.loadFromCookie(pb_auth);

  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedList, setSelectedList] = useState<string>("");
  const [list, setList] = useState<Record | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLists(await pb.collection("lists").getFullList({ sort: "-created" }));
      setItems(await pb.collection("items").getFullList());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setList(await pb.collection("lists").getOne(selectedList));
    };
    fetchData();
  }, [selectedList]);

  return (
    <main className="flex flex-row flex-1 overflow-hidden">
      <aside className="bg-card z-0 shadow border-r p-2 min-w-[250px] max-w-[300px]">
        <div className="flex flex-col gap-2 h-full overflow-hidden">
          <div className="flex items-center justify-between">
            <h2>Lists</h2>
            <form action={`/api/lists`} method="post">
              <Button className="w-full" size="sm" variant="ghost">
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3 mr-2" />
                New List
              </Button>
            </form>
          </div>
          <ListOfLists {...{ lists, selectedList, setSelectedList }} />
          <br />
          <h2 className="mt-4">Gear</h2>
          <ListOfItems items={items} />
        </div>
      </aside>
      <div className="flex-1 w-full p-4 overflow-auto">
        {list ? <List {...{ list }} /> : <ListPlaceholder />}
      </div>
    </main>
  );
};

export default App;
