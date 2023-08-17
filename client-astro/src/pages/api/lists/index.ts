import type { APIRoute } from "astro";

export const get: APIRoute = async ({ locals }) => {
  const data = await locals.pb.collection("lists").getFullList();
  return new Response(JSON.stringify(data));
};

export const post: APIRoute = async ({ locals, redirect }) => {
  try {
    const newList = await locals.pb.collection("lists").create();
    return redirect(`/${newList.id}`);
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
