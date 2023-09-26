import { RouteObject, createBrowserRouter } from "react-router-dom";

import { ErrorPage } from "./components/Error.tsx";

import { WithNavbar } from "./layouts/WithNavbar.tsx";

import { Auth } from "./pages/Auth.tsx";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <WithNavbar />,
    ErrorBoundary: ErrorPage,
    children: [
      {
        path: "/auth",
        element: <Auth />,
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
