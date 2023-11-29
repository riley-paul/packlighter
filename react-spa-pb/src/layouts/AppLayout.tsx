import { AccountEditor } from "@/components/AccountEditor";
import { ListList } from "@/components/ListList";
import { Feather } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <header className="w-full border-b h-14 flex items-center bg-card shadow z-50">
        <div className="container flex justify-between">
          <Link to="/" className="flex items-center">
            <Feather className="mr-3 w-6 text-accent-foreground" />
            <h1 className="font-medium text-lg">PackLighter</h1>
          </Link>
          <AccountEditor />
        </div>
      </header>
      <main className="flex-1 py-6 overflow-auto">
        <div className="container grid gap-4 grid-cols-[1fr_250px]">
          <Outlet />
          <aside className="h-fit">
            <ListList />
          </aside>
        </div>
      </main>
    </div>
  );
};
