import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/router.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
