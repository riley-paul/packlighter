import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, locals, redirect }) => {
  try {
    await locals.pb.collection("lists").delete(params.id || "");
    return redirect("/");
  } catch (err) {
    return new Response("could not delete list", { status: 404 });
  }
};
