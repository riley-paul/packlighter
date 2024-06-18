import type { AppType } from "@repo/server";
import { hc } from "hono/client";

export const api = hc<AppType>("http://localhost:4321").api;
