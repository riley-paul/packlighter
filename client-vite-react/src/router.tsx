import { RouteObject, createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "./components/Error.tsx";

import { WithNavbar } from "./layouts/WithNavbar.tsx";
import { WithSidebar } from "./layouts/WithSidebar.tsx";

import { Welcome } from "./pages/Welcome.tsx";
import { Auth } from "./pages/Auth.tsx";
import { List } from "./pages/List.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    ErrorBoundary: ErrorPage,
    element: <Welcome />,
  },
  {
    element: <WithNavbar />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        element: <WithSidebar />,
        children: [
          {
            path: "/:listId",
            element: <List />,
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
