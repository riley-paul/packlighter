import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  const list = await locals.pb.collection("lists").getOne(params.id ?? "");
  return { list };
};

export const actions: Actions = {
  delete: async ({ locals, params }) => {
    await locals.pb.collection("lists").delete(params.id ?? "");
    throw redirect(303, "/");
  },
  duplicate: async ({ locals, params }) => {
    const list = await locals.pb.collection("lists").getOne(params.id ?? "");
    const { name, description, categories } = list;
    const newList = await locals.pb
      .collection("lists")
      .create({ name, description, categories, user: locals.user.id });
    throw redirect(303, `/${newList.id}`);
  },
};
