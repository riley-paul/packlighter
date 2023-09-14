import ReactDOM from "react-dom/client";
import "./index.css";

import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
