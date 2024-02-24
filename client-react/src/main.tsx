import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/query.ts";
import Root from "./routes/root";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const router = createBrowserRouter([{ path: "/", element: <Root /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={webLightTheme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </FluentProvider>
);
