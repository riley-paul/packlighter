import { Hono } from "hono";
import authRoutes from "./routes/auth";
import categoryItemRoutes from "./routes/categories-items";
import categoryRoutes from "./routes/categories";
import itemRoutes from "./routes/items";
import listRoutes from "./routes/lists";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoutes)
  .route("/categories-items", categoryItemRoutes)
  .route("/categories", categoryRoutes)
  .route("/items", itemRoutes)
  .route("/lists", listRoutes)
  .get("/", (c) => c.json({ message: "Hello Hono!" }));

export default app;
export type AppType = typeof routes;
