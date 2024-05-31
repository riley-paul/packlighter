import { defineMiddleware } from "astro:middleware";
import { createClient } from "@/lib/client";

const WHITE_LIST = ["/welcome", "/login", "/signup"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;

  if (url.pathname.startsWith("/api") || WHITE_LIST.includes(url.pathname)) {
    return next();
  }

  const client = createClient(context);

  const res = await client.api.auth.me.$get();
  if (!res.ok || res.status !== 200) {
    return context.redirect("/welcome");
  }

  return next();
});
