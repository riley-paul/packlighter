import { error, type Actions, type ServerLoad, redirect } from "@sveltejs/kit";

export const load: ServerLoad = async ({ fetch, params }) => {
  return { list: fetch(`/app/list/${params.id}`).then((res) => res.json()) };
};

export const actions: Actions = {
  create: async () => {
    const list = await fetch(`/app/list`, { method: "POST" }).then((res) =>
      res.json()
    );
    throw redirect(303, `/app/list/${list.id}`);
  },
};
