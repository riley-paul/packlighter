import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./pages/Welcome.tsx"),
  },
  {
    lazy: () => import("./layouts/WithNavbar.tsx"),
    children: [
      {
        path: "/auth",
        lazy: () => import("./pages/Auth.tsx"),
      },
      {
        lazy: () => import("./layouts/WithSidebar.tsx"),
        children: [
          {
            path: "/:listId",
            lazy: () => import("./pages/List.tsx"),
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
