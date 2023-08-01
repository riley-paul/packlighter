import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ fetch }) => {
  return { lists: fetch("/app/list").then((res) => res.json()) };
};
