import { pb } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const list = await pb.collection("lists").getOne(params.id);
  const categories = await pb
    .collection("list_categories")
    .getFullList(undefined, {
      filter: `list="${list.id}"`,
      expand: "categories_gear(category).gear",
    });

  return { list, categories };
};
