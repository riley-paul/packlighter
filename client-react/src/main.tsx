import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query.ts";
import Root from "./routes/root";
import AuthPage from "./routes/auth";
import App from "./routes/app";
import ListPage from "./routes/list";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./components/theme-provider";
import GearPage from "./routes/all-gear";
import Home from "./routes/home";
import ErrorPage from "./routes/error";
import { pb } from "./lib/pocketbase";
import { getPaths } from "./lib/utils";

const router = createBrowserRouter([
  {
    path: getPaths.home(),
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <App />,
        loader: () => {
          if (!pb.authStore.isValid) return redirect(getPaths.auth());
          return "";
        },
        children: [
          { index: true, element: <Home /> },
          { path: getPaths.list(":listId"), element: <ListPage /> },
          { path: getPaths.gear(), element: <GearPage /> },
        ],
      },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
