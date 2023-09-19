import { useEffect, useState } from "react";
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

import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

function Item(props: { item: Record }) {
  const { item } = props;
  return (
    <CommandItem className="flex-col items-start w-full" draggable>
      <div className="flex justify-between w-full items-end">
        <span>{item.name}</span>
        <span className="font-normal italic text-muted-foreground text-xs">
          {item.weight_g}g
        </span>
      </div>
      <div className=" text-muted-foreground text-xs w-[190px] mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
        {item.description}
      </div>
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

  useEffect(() => console.log(searchTerm), [searchTerm]);

  return (
    <Command>
      <CommandInput
        value={searchTerm}
        onValueChange={(value) => setSearchTerm(value)}
        placeholder="Search gear..."
      ></CommandInput>
      <CommandEmpty>No gear found.</CommandEmpty>
      <ScrollArea>
        <CommandGroup className="pr-3">
          {items.filter(filterSearch).map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </CommandGroup>
      </ScrollArea>
    </Command>
  );
}
