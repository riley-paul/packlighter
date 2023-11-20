import { defineMiddleware } from "astro/middleware";
import PocketBase from "pocketbase";
import { serializeNonPOJOs } from "./lib/utils";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./lib/database";

export const onRequest = defineMiddleware(
  async ({ locals, request, url, redirect, cookies }, next) => {
    try {
      locals.sb = createClient<Database>(
        import.meta.env.SUPABASE_URL,
        import.meta.env.SUPABASE_URL
      );
    } catch (err) {
      console.error("could not connect to Supabase");
      return new Response("Could not connect to Supabase", { status: 500 });
    }

    const accessToken = cookies.get("sb-access-token")?.value ?? "";
    const refreshToken = cookies.get("sb-refresh-token")?.value ?? "";

    const { data, error } = await locals.sb.auth.setSession({
      refresh_token: refreshToken,
      access_token: accessToken,
    });

    if (error) {
      cookies.delete("sb-access-token", { path: "/" });
      cookies.delete("sb-refresh-token", { path: "/" });
    } else if (data.session) {
      const { access_token, refresh_token } = data.session;
      cookies.set("sb-access-token", access_token, { path: "/" });
      cookies.set("sb-refresh-token", refresh_token, { path: "/" });
      locals.user = data.user;
      
      console.log("user logged in", data.user);
    }

    // complete other actions
    const response = await next();

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
