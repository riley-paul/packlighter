import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  create: async () => {
    const list = await fetch(`/app/list`, { method: "POST" }).then((res) =>
      res.json()
    );
    throw redirect(303, `/app/list/${list.id}`);
  },
};