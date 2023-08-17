import type { APIRoute } from "astro";

export const post: APIRoute = async ({ params, locals, redirect }) => {
  await locals.pb.collection("lists").delete(params.id || "");
  return redirect("/");
};
