import React from "react";
import { Outlet } from "react-router-dom";

export default function App(): ReturnType<React.FC> {
  return (
    <>
      <header className="w-full px-6 py-2 bg-secondary text-lg">
        PackLighter
      </header>
      <Outlet />
    </>
  );
}
