import type { AppType } from "@/api";
import type { APIContext } from "astro";
import { hc } from "hono/client";

const client = hc<AppType>("/");
const api = client.api;

export default api;

export const createClient = (context: APIContext) => {
  const { request, url } = context;
  const headers = Object.fromEntries(request.headers);
  const client = hc<AppType>(url.origin, { headers });
  return client;
};
