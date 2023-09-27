import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ locals, request, params }) => {
  const id = params.id || "";
  try {
    const data = await request.json();
    await locals.pb.collection("lists").update(id, data);
    return new Response(null);
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
