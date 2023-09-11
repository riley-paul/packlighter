import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <header className="z-50">
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
};
