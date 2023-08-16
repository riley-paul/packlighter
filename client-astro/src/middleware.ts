import { defineMiddleware } from "astro/middleware";
import PocketBase from "pocketbase";

export const onRequest = defineMiddleware(({ locals, request }, next) => {
  locals.pb = new PocketBase(import.meta.env.PB_URL);
  return next();
});
