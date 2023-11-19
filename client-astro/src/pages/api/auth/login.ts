import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request, redirect }) => {
  const userData = await request.json();

  try {
    await locals.pb
      .collection("users")
      .authWithPassword(String(userData.email), String(userData.password));
    return redirect("/");
  } catch (err) {
    console.error("pocketbase error", err);
    return new Response(JSON.stringify(err), { status: 401 });
  }
};
