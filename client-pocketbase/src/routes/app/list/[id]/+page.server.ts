import type { Load } from "@sveltejs/kit";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: Load = async ({ params, fetch }) => {
  return fetch(`/app/list/${params.id}`).then((res) => res.json());
};

export const actions: Actions = {
  default: async ({ fetch }) => {
    const newList = await fetch("/app/list", { method: "POST" }).then((res) =>
      res.json()
    );
    console.log(newList);
    throw redirect(300, `/app/list/${newList.id}`);
  },
};
