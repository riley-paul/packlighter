import { Hono } from "hono";

import stationRoutes from "./routes/stations";
import authRoutes from "./routes/auth";
import settingsRoutes from "./routes/settings";
import emailsRoutes from "./routes/emails";
import weatherRoutes from "./routes/weather";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoutes)
  .route("/emails", emailsRoutes)
  .route("/settings", settingsRoutes)
  .route("/stations", stationRoutes)
  .route("/weather", weatherRoutes)
  .get("/", (c) => c.json({ message: "Hello Hono!" }));

export default app;
export type AppType = typeof routes;
