import type { Actions, ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  const items = await locals.pb.collection("items").getFullList();
  return { items };
};

export const actions: Actions = {
  updateItem: async ({ locals, request }) => {
    const data = await request.formData();
    data.append("user", locals.user.id);

    console.log("updating item");
    await locals.pb.collection("items").update(data.get("id") as string, data);
    console.log("item updated");
  },
};
