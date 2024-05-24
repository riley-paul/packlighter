import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="h-[100svh] flex overflow-hidden">
      <Outlet />
    </main>
  ),
});
