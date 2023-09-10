import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListOfItems } from "./ListOfItems.jsx";
import ListOfLists from "./ListOfLists.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Component() {
  return (
    <div className="flex flex-col gap-2 h-full overflow-hidden">
      <div className="flex items-center justify-between">
        <CardTitle>Lists</CardTitle>
        <form action={`/api/lists`} method="post">
          <Button className="w-full" size="sm" variant="ghost">
            <FontAwesomeIcon icon={faPlus} className="h-3 w-3 mr-2" />
            New List
          </Button>
        </form>
      </div>
      {/* <ListOfLists lists={lists} />
  <br />
  <CardTitle className="mt-4">Gear</CardTitle>
  <ListOfItems items={items} client:load /> */}
    </div>
  );
}
