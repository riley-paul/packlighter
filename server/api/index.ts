import { app } from "@/index.ts";
import { handle } from "@hono/node-server/vercel";

export default process.env.VERCEL ? handle(app) : app;
