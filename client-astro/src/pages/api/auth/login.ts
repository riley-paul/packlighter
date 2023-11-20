import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request, redirect }) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    await locals.pb.collection("users").authWithPassword(email, password);
    return redirect("/");
  } catch (err) {
    console.error("pocketbase error", err);
    return new Response(JSON.stringify(err), { status: 401 });
  }
};
