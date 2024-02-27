import SideBar from "@/components/side-bar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function App(): ReturnType<React.FC> {
  return (
    <div className="flex w-full h-full">
      <aside className="w-[300px] border-r">
        <SideBar />
      </aside>
      <Outlet />
    </div>
  );
}
