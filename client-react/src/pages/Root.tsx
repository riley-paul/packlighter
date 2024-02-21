import React from "react";
import { Outlet } from "react-router-dom";

export default function Root(): ReturnType<React.FC> {
  return (
    <div className="h-screen w-screen">
      <Outlet />
    </div>
  );
}
