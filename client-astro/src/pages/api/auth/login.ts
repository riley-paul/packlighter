import type { APIRoute } from "astro";

export const post: APIRoute = async ({ locals, request, redirect }) => {
  const formData = await request.formData();

  console.log("attempting login")

  try {
    await locals.pb
      .collection("users")
      .authWithPassword(formData.get("email"), formData.get("password"));
  } catch (err) {
    console.error("pocketbase error", err);
  }

  return redirect("/");
};
