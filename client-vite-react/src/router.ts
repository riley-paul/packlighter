import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./components/Error.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    ErrorBoundary: ErrorPage,
    lazy: () => import("./pages/Welcome.tsx"),
  },
  {
    lazy: () => import("./layouts/WithNavbar.tsx"),
    ErrorBoundary: ErrorPage,
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
  {
    path: "/api",
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "auth/login",
        lazy: () => import("./api/login.ts"),
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
