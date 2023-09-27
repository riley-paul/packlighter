import type { Category } from "@/lib/types";
import type { APIRoute } from "astro";

const defaultCategories: Category[] = [{ name: "", items: [] }];

export const GET: APIRoute = async ({ locals, params }) => {
  const id = params.id || "";
  try {
    const response = await locals.pb.collection("lists").getOne(id);
    if (!response.categories) response.categories = defaultCategories;
    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

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
