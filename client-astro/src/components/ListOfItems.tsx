import { useState } from "react";
import { Input } from "./ui/input";
import type { Record } from "pocketbase";
import { ScrollArea } from "./ui/scroll-area";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

function Item(props: { item: Record }) {
  const { item } = props;
  return (
    <CommandItem className="flex-col items-start h-auto text-left" draggable>
      <CardTitle className="flex justify-between w-full">
        <span>{item.name}</span>{" "}
        <span className="font-normal italic text-muted-foreground">
          {item.weight_g}g
        </span>
      </CardTitle>
      <CardDescription className="text-xs w-[210px] mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
        {item.description}
      </CardDescription>
    </CommandItem>
  );
}

export function ListOfItems(props: { items: Record[] }) {
  const { items } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const filterSearch = (item: Record) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    );
  };

  return (
    <Command>
      <CommandInput placeholder="Search gear..."></CommandInput>
      <CommandEmpty>No gear found.</CommandEmpty>
      <ScrollArea>
        <CommandGroup>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </CommandGroup>
      </ScrollArea>
    </Command>
    // <div className="flex flex-col gap-2 overflow-hidden">
    //   <Input
    //     type="search"
    //     placeholder="Search..."
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />
    //   <ScrollArea className="max-h-1/2 border rounded-md p-2 pr-3">
    //     <div className="grid gap-1">
    //     </div>
    //   </ScrollArea>
    // </div>
  );
}
