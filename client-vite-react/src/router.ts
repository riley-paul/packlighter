import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("./App.tsx"),
  },
];

const router = createBrowserRouter(routes);
export default router;
