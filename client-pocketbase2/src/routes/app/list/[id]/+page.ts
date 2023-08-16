import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params, fetch }) => {
  return {
    list: fetch(`/app/list/${params.id}`).then((res) => res.json()),
  };
};
