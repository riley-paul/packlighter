import {
  fail,
  redirect,
  type Actions,
  type ServerLoad,
  error,
} from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import { signInSchema, signUpSchema } from "$lib/config/schemas";
import { generateFromEmail } from "unique-username-generator";
import type { ClientResponseError } from "pocketbase";

export const load: ServerLoad = async (event) => {
  if (event.locals.pb.authStore.isValid) throw redirect(302, "/");
  const signUpForm = await superValidate(event, signUpSchema);
  const loginForm = await superValidate(event, signInSchema);
  return { signUpForm, loginForm };
};

export const actions: Actions = {
  login: async (event) => {
    const form = await superValidate(event, signInSchema);
    //console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await event.locals.pb
        .collection("users")
        .authWithPassword(form.data.email, form.data.password);
    } catch (err: any) {
      console.error("pocketbase error", err);
      const pocketbaseError = err as ClientResponseError;
      for (let fieldError of Object.keys(pocketbaseError.response.data)) {
        setError(
          form,
          fieldError,
          pocketbaseError.response.data[fieldError].message
        );
      }
      setError(form, "", pocketbaseError.response.message);
      return { form };
    }
    throw redirect(303, "/app");
  },
  signUp: async (event) => {
    const form = await superValidate(event, signUpSchema);
    //console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    let username = generateFromEmail(form.data.email);

    try {
      await event.locals.pb
        .collection("users")
        .create({ username, ...form.data });
      await event.locals.pb
        .collection("users")
        .requestVerification(form.data.email);
    } catch (err: any) {
      const pocketbaseError = err as ClientResponseError;
      for (let fieldError of Object.keys(pocketbaseError.response.data)) {
        setError(
          form,
          fieldError,
          pocketbaseError.response.data[fieldError].message
        );
      }
      setError(form, "", pocketbaseError.response.message);
      return { form };
    }
    throw redirect(303, "/app");
  },
};
