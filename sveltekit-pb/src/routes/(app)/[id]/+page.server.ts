import { invalidate } from "$app/navigation";
import { redirect, type Actions, type ServerLoad, fail } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, params }) => {
  const list = await locals.pb.collection("lists").getOne(params.id ?? "");
  const listItems = await locals.pb
    .collection("list_items")
    .getFullList({ filter: `list = "${params.id ?? ""}"`, expand: "item" });
  const items = await locals.pb
    .collection("items")
    .getFullList({ sort: "name" });

  const currentItems = listItems.map((i) => i.item);
  const itemOptions = items.filter((i) => !currentItems.includes(i.id));
  return { list, listItems, itemOptions };
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
  update: async ({ locals, params, request }) => {
    const formData = await request.formData();
    formData.append("user", locals.user.id);

    try {
      await locals.pb.collection("lists").update(params.id ?? "", formData);
    } catch (err) {
      console.log("could not update list");
      console.error(err);
    }
  },
  addItem: async ({ locals, params, request, url }) => {
    const formData = await request.formData();
    try {
      await locals.pb.collection("list_items").create({
        user: locals.user.id,
        list: params.id,
        item: formData.get("item") as string,
      });
    } catch (err: any) {
      return fail(422, { error: err.message });
    }
  },
  removeItem: async ({ locals, params, request }) => {
    const data = await request.formData();
    await locals.pb.collection("list_items").delete(data.get("id") as string);
  },
};
