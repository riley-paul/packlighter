import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
  if (locals.user)
    return {
      user: locals.user,
      avatarImageUrl: locals.pb.files.getUrl(locals.user, locals.user.profile),
    };
  return { user: undefined };
};
