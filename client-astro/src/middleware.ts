import { defineMiddleware } from "astro/middleware";
import PocketBase from "pocketbase";
import { serializeNonPOJOs } from "./utils";

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  locals.pb = new PocketBase(import.meta.env.PB_URL);

  // grab cookie from browser if exists
  locals.pb.authStore.loadFromCookie(request.headers.get("cookie") || "");

  try {
    if (locals.pb.authStore.isValid) {
      await locals.pb.collection("users").authRefresh();
      const user = serializeNonPOJOs(locals.pb.authStore.model);
      locals.user = user;
    }
  } catch (_) {
    locals.pb.authStore.clear();
    locals.user = undefined;
  }

  const response = await next();
  response.headers.set(
    "set-cookie",
    locals.pb.authStore.exportToCookie({ secure: false })
  );

  return response;
});
