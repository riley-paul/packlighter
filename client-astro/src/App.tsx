import PocketBase, { Record } from "pocketbase";
import { Button } from "./components/ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ListOfItems } from "./components/ListOfItems.tsx";
import { ListOfLists } from "./components/ListOfLists.tsx";
import { List } from "./components/List.tsx";
import { ListPicker } from "./components/ListPicker.tsx";
import { Label } from "./components/ui/label.tsx";
import { useToast } from "./components/ui/use-toast.ts";

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
  const { toast } = useToast();

  pb.authStore.loadFromCookie(props.pb_auth);

  const [items, setItems] = useState(props.initialItems);
  const [list, setList] = useState(props.initialList);

  console.log("hello from js");

  return (
    <main className="flex flex-row flex-1 overflow-hidden">
      <aside className="bg-card z-0 shadow border-r p-2 w-[250px]">
        <div className="flex flex-col gap-2 h-full overflow-hidden">
          <div className="flex justify-between items-center">
            <Label>List</Label>
            {/* <form action={`/api/lists`} method="post">
              <Button className="w-full" size="sm" variant="ghost">
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3 mr-2" />
                New List
              </Button>
            </form> */}
          </div>
          <ListPicker lists={props.lists} currentListId={props.currentListId} />

          <Button
            variant="outline"
            onClick={() => {
              toast({
                description: "Your message has been sent.",
              });
            }}
          >
            Show Toast
          </Button>
          <div className="flex items-center justify-between">
            <h2>Lists</h2>
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
        <List {...{ list }} />
      </div>
    </main>
  );
};

export default App;
