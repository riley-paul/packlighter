import React from "react";
import { Input } from "./ui/input";
import { useDataQuery } from "@/hooks/useDataQuery";
import { Button } from "./ui/button";
import { GripVertical, Plus, X } from "lucide-react";

interface Props {}

export const ItemList: React.FC<Props> = () => {
  const { queryItems, deleteItem } = useDataQuery();
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <>
      <div className="p-2 border-b">
        <div className="flex items-center gap-2 justify-between mb-2">
          <h2 className="text-sm font-medium">Gear</h2>
          <Button size="sm" variant="ghost">
            <Plus className="h-4 w-4 mr-2" />
            New Gear
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="bg-card"
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {queryItems.data
          ?.filter(
            (i) =>
              i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              i.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.id}
              className="text-sm pr-2 py-1 hover:bg-card transition-colors flex items-center gap-1"
            >
              <div>
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="">{item.name}</h3>
                <p className="text-muted-foreground text-xs">
                  {item.description}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => deleteItem.mutate(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};
