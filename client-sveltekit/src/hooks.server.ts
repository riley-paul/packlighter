import { redirect, type Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase("http://127.0.0.1:8090");

  // grab cookie from browser if exists
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh();
      const user = structuredClone(event.locals.pb.authStore.model);
      event.locals.user = user;
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
    event.locals.user = undefined;
  }

  if (!event.route.id?.startsWith("/auth") && !event.locals.user) {
    throw redirect(302, "/auth");
  }

  // complete other actions
  const response = await resolve(event);

  // set cookie to latest authstore
  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ secure: false })
  );

  // carry on
  return response;
};
