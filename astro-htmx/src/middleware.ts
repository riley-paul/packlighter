/**
 * There is currently no way to get a astro route to just return the HTML
 * without the CSS and IS. This is a workaround to remove the CSS and IS from
 * the HTML response of HTMX fragment routes.
 *
 * The premise here is that HTMX fragments won't required additional styles because
 * the Tailwind for the entire experience is alreay precomputed.
 * And second that it will not require additional IS because ... HTMX.
 */

import { defineMiddleware } from "astro:middleware";

const HTMX_FRAGMENT_ROUTES = ["/todos"];

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const response = await next();
  let html = await response.text();

  if (HTMX_FRAGMENT_ROUTES.some((route) => request.url.includes(route))) {
    html = html.replace(/<style type\=\"text\/css\"(.*)<\/style>/s, "");
    html = html.replace(/<script(.*)<\/script>/gm, "");
  }
  return new Response(html, { status: 200, headers: response.headers });
});
