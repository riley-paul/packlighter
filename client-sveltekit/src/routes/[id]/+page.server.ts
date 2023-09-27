import {
  fail,
  redirect,
  type Actions,
  type ServerLoad,
  error,
} from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
  if (event.locals.pb.authStore.isValid) throw redirect(302, "/");
  const form = await superValidate(event, signUpSchema);
  return { form };
};
