import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  return {
    lists: locals.pb.collection("lists").getFullList({ sort: "-updated" }),
  };
};
