import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/query.ts";
import Root from "./routes/root";
import { FluentProvider, Toaster, tokens } from "@fluentui/react-components";
import { TOASTER_ID } from "./lib/constants";
import AuthPage from "./routes/auth";
import { darkTheme } from "./lib/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "auth", element: <AuthPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <FluentProvider
    theme={darkTheme}
    style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: tokens.colorNeutralBackground3,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <Toaster toasterId={TOASTER_ID} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </FluentProvider>
);
