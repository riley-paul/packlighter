import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    lists: await locals.pb
      .collection("lists")
      .getFullList({ sort: "-updated" }),
  };
};

export const actions: Actions = {
  logout: async ({ locals }) => {
    locals.pb.authStore.clear();
    locals.user = undefined;
    throw redirect(303, "/");
  },
  createList: async ({ locals }) => {
    const newList = await locals.pb
      .collection("lists")
      .create({ user: locals.user.id });
    throw redirect(303, `/${newList.id}`);
  },
};
