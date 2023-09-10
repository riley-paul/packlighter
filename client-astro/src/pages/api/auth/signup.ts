import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request, redirect }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    await locals.pb.collection("users").create({ ...userData });
    await locals.pb
      .collection("users")
      .authWithPassword(String(userData.email), String(userData.password));
  } catch (err) {
    console.error("pocketbase error", err);
  }

  return redirect("/");
};
