import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query.ts";
import Root from "./routes/root";
import ListPage from "./routes/list";
import GearPage from "./routes/all-gear";
import Home from "./routes/home";
import ErrorPage from "./routes/error";
import { getPaths } from "@/lib/utils";

const router = createHashRouter([
  {
    path: getPaths.home(),
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: getPaths.list(":listId"), element: <ListPage /> },
      { path: getPaths.gear(), element: <GearPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
