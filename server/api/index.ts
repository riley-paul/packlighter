import { app } from "../src/index.ts";
import { handle } from "@hono/node-server/vercel";

// export const config = {
//   runtime: "edge",
// };

export default process.env.VERCEL ? handle(app) : app;
