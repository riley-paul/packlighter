import React from "react";
import { Outlet } from "react-router-dom";

export default function Root(): ReturnType<React.FC> {
  return (
    <main className="h-[100svh] flex overflow-hidden">
      <Outlet />
    </main>
  );
}
