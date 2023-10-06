import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    lazy: () => import("../layouts/Layout"),
    children: [
      {
        path: "/",
        lazy: () => import("../pages/Home"),
      },
      {path: "/:id", lazy: () => import("../pages/List")},
      {path: "/gear", lazy: () => import("../pages/Gear")},
    ],
  },
]);
