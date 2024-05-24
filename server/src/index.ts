import { Hono } from "hono";

import authRoutes from "./routes/auth";

export const config = {
  runtime: "edge",
};

export const app = new Hono().basePath("/api");
const routes = app
  .route("/auth", authRoutes)
  .get("/", (c) => c.json({ message: "Hello Hono!" }));

export type AppType = typeof routes;
