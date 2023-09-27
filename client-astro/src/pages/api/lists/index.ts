import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ locals }) => {
  const data = await locals.pb.collection("lists").getFullList();
  return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ locals, redirect }) => {
  try {
    const newList = await locals.pb
      .collection("lists")
      .create({ user: locals.user.id });
    return redirect(`/${newList.id}`);
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
