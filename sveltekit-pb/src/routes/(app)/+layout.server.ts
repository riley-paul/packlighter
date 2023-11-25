import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    avatarImageUrl: locals.pb.files.getUrl(locals.user, locals.user.avatar),
    // lists: await locals.pb.collection("lists").getFullList({ sort: "-updated" }),
  };
};
