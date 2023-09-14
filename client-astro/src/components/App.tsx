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
  currentListId: string;
  lists: Record[];
  initialItems: Record[];
  initialList: Record;
}

const App: React.FC<Props> = (props) => {
  const pb = new PocketBase(props.pb_url);
  pb.authStore.loadFromCookie(props.pb_auth);

  const [items, setItems] = useState(props.initialItems);
  const [list, setList] = useState(props.initialList);

  return (
    <main className="flex flex-row flex-1 overflow-hidden">
      <aside className="bg-card z-0 shadow border-r p-2 w-[250px]">
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
          <ListOfLists
            lists={props.lists}
            currentListId={props.currentListId}
          />
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
