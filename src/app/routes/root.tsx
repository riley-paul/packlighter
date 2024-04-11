import SideBar from "@/components/side-bar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Root(): ReturnType<React.FC> {
  return (
    <main className="h-[100svh] flex overflow-hidden">
      <div className="flex w-full">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
