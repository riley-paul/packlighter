import type { APIRoute } from "astro";

export const get: APIRoute = async ({ locals }) => {
  const data = await locals.pb.collection("items").getFullList();
  return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ locals, redirect }) => {
  try {
    const newItem = await locals.pb
      .collection("items")
      .create({ user: locals.user.id });
    return redirect(`/${newItem.id}`);
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
