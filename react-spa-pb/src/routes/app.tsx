import SideBar from "@/components/side-bar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function App(): ReturnType<React.FC> {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
