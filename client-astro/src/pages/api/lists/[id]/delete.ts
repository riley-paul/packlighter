import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, locals, redirect }) => {
  await locals.pb.collection("lists").delete(params.id || "");
  return redirect("/");
};
