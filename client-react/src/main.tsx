import ReactDOM from "react-dom/client";
import Root from "./pages/Root.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient.ts";
import { ThemeProvider } from "./components/themeProvider.tsx";
import AllGear from "./pages/AllGear.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import App from "./pages/App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <App />,
        children: [{ path: "all-gear", element: <AllGear /> }],
      },
      { path: "auth", element: <Auth /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
