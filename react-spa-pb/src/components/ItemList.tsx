import React from "react";
import { Input } from "./ui/input";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Item } from "./Item";

interface Props {}

export const ItemList: React.FC<Props> = () => {
  const { queryItems } = useDataQuery();
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <>
      <div className="flex items-center gap-4 p-2 pl-4">
        <h2 className="text-sm font-medium">Items</h2>
        <Input
          type="search"
          className="text-sm h-auto"
          placeholder="Search..."
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
      </div>
      <div className="grid gap-2 overflow-auto pl-4 p-2">
        {queryItems.data
          ?.filter(
            (i) =>
              i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              i.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <Item key={item.id} item={item} />
          ))}
      </div>
    </>
  );
};
