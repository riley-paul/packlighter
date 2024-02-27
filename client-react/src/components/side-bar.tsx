import React from "react";
import PackingLists from "./packing-lists";
import { Feather } from "lucide-react";

export default function SideBar(): ReturnType<React.FC> {
  return (
    <div className="flex flex-col">
      <header className="border-b h-12 flex gap-2 items-center px-4">
        <Feather size="1.5rem" className="text-primary" />
        <span className="text-lg font-semibold">PackLighter</span>
      </header>
      <section className="px-2 py-2">
        <PackingLists />
      </section>
    </div>
  );
}
