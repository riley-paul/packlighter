import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import lists from "./routes/lists";
import items from "./routes/items";

const app = new Hono();

app.use("*", clerkMiddleware());

const routes = app.route("/lists", lists).route("/items", items);

export type AppType = typeof routes;
export default app;
