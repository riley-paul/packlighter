import {
  fail,
  redirect,
  type Actions,
  type ServerLoad,
  error,
} from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import { signInSchema } from "$lib/config/schemas";
import type { ClientResponseError } from "pocketbase";

export const load: ServerLoad = async (event) => {
  if (event.locals.pb.authStore.isValid) throw redirect(302, "/app");
  const form = await superValidate(event, signInSchema);
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
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
};
