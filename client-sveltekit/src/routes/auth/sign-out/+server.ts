import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
  locals.pb.authStore.clear();
  locals.user = undefined;

  throw redirect(303, "/auth/sign-in");
};
