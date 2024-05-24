import type { AppType } from "@repo/server/src/index";
import { hc } from "hono/client";

const client = hc<AppType>(process.env.API_URL ?? "/");
export default client;
