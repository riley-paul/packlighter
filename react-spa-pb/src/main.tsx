import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./globals.css";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        lazy: () => import("./layouts/AppLayout.tsx"),
        children: [
          { index: true, lazy: () => import("./pages/Home.tsx") },
          { path: ":listId", lazy: () => import("./pages/List.tsx") },
        ],
      },
      { path: "auth", lazy: () => import("./pages/Auth.tsx") },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
