import SideBar from "@/components/side-bar";
import { api } from "@/lib/client.ts";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    const response = await api.auth.me.$get();
    if (response.status === 401) {
      throw redirect({
        to: "/welcome",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
});
