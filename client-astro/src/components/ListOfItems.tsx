import { useState } from "react";
import { Input } from "./ui/input";
import type { Record } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface Props {
  items: Record[];
}

function Item(props: { item: Record }) {
  const { item } = props;
  return (
    <Button
      className="flex-col items-start h-auto text-left"
      variant="ghost"
      key={item.id}
    >
      <CardTitle className="flex justify-between w-full">
        <span>{item.name}</span>{" "}
        <span className="font-normal italic text-muted-foreground">
          {item.weight_g}g
        </span>
      </CardTitle>
      <CardDescription className="text-xs mt-1">
        {item.description}
      </CardDescription>
    </Button>
  );
}

export function ListOfItems(props: Props) {
  const { items } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const filterSearch = (item: Record) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></Input>
      <ScrollArea className="overflow-y-auto max-h-1/2 h-full border rounded-md p-2 pr-4">
        <div className="grid gap-1">
          {items.filter(filterSearch).map((item) => (
            <Item item={item} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
