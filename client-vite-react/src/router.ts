import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./pages/Welcome.tsx"),
  },
  {
    path: "/auth",
    lazy: () => import("./pages/Auth.tsx"),
  },
];

const router = createBrowserRouter(routes);
export default router;
