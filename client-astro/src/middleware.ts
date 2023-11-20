import { defineMiddleware } from "astro/middleware";
import PocketBase from "pocketbase";
import { serializeNonPOJOs } from "./lib/utils";

export const onRequest = defineMiddleware(
  async ({ locals, request, url, redirect, cookies }, next) => {
    try {
      locals.pb = new PocketBase(import.meta.env.PB_URL);
    } catch (err) {
      console.error("could not connect to PocketBase");
      return new Response("Could not connect to Pocketbase", { status: 500 });
    }

    // grab cookie from browser if exists
    const authCookie = cookies.get("pb_auth");
    locals.pb.authStore.loadFromCookie(authCookie?.value ?? "");

    try {
      if (locals.pb.authStore.isValid) {
        await locals.pb.collection("users").authRefresh();
        const user = serializeNonPOJOs(locals.pb.authStore.model);
        locals.user = user;
      }
    } catch (_) {
      console.log("invalid auth cookie");
      locals.pb.authStore.clear();
      locals.user = undefined;
    }

    // complete other actions
    const response = await next();

    // set cookie to latest authstore
    cookies.set(
      "pb_auth",
      locals.pb.authStore.exportToCookie({ secure: false })
    );

    // redirect if not logged in
    if (
      !locals.user &&
      !(
        url.pathname.startsWith("/auth") || url.pathname.startsWith("/api/auth")
      )
    ) {
      console.log(`blocked access to ${url.pathname}`);
      return redirect("/auth");
    }

    // set cookie to latest authstore
    return response;
  }
);
