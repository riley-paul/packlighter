import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.auth().userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify(await locals.currentUser()));
};
