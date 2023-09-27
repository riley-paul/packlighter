import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  const items = await locals.pb.collection("items").getFullList();
  return { items };
};
