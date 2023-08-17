import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import type { Record } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  items: Record[];
}

export function ListOfItems(props: Props) {
  const { items } = props;
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></Input>
      <ScrollArea className="overflow-y-auto max-h-1/2 h-full border rounded-md p-2">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
      </ScrollArea>
    </>
  );
}
