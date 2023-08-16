import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ fetch }) => {
    const newList = await fetch("/app/list", { method: "POST" }).then((res) =>
      res.json()
    );
    throw redirect(300, `/app/list/${newList.id}`);
  },
};
