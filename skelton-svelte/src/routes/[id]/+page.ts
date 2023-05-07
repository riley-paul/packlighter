import { pb } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  return { list: pb.collection("lists").getOne(params.id) };
};
