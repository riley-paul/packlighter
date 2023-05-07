import type { LayoutLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = ({}) => {
  return {
    lists: pb.collection("lists").getFullList(),
    gear: pb.collection("gear").getFullList(),
  };
};
