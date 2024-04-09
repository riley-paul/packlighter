import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import lists from "./routes/lists";
import items from "./routes/items";

const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/", (c) =>
  c.json({
    name: "PackLighter API",
    version: "v1",
    description: "Packing list API",
    documentation_url: "https://your-api-documentation.com",
    status: "OK",
  })
);

const routes = app.route("/lists", lists).route("/items", items);

export type AppType = typeof routes;
export default app;
