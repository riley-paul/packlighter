import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export const WithSidebar: React.FC = () => {
  return (
    <main className="flex flex-row flex-1 overflow-hidden">
      <aside className="bg-card z-0 shadow border-r p-2 min-w-[250px] max-w-[300px]">
        <Sidebar />
      </aside>
      <div className="flex-1 w-full p-4 overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};
