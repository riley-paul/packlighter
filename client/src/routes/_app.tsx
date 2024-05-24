import SideBar from "@/components/side-bar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: () => (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
});
