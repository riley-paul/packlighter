import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { QueryClientProvider } from "react-query";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: () => {
          if (!pb.authStore.isValid) return redirect("/auth");
          return "";
        },
        children: [
          { index: true, element: <Home /> },
          { path: "list/:listId", element: <ListPage /> },
          { path: "gear", element: <GearPage /> },
        ],
      },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
