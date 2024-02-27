import React from "react";
import PackingLists from "./packing-lists";
import { Feather, Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function SideBar(): ReturnType<React.FC> {
  return (
    <div className="flex flex-col">
      <header className="border-b h-12 flex items-center">
        <Button size="icon" variant="ghost" className="rounded-none h-12 w-12">
          <Menu size="1.2rem" />
        </Button>
        <div className="flex gap-2 items-center px-4">
          <Feather size="1.5rem" className="text-primary" />
          <span className="text-lg font-semibold">PackLighter</span>
        </div>
      </header>
      <section className="px-2 py-2">
        <PackingLists />
      </section>
    </div>
  );
}
