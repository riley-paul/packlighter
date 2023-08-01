import { fail, redirect, type ServerLoad, type Actions } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { resetPasswordSchema } from "$lib/config/schemas";
import type { ClientResponseError } from "pocketbase";

export const load: ServerLoad = async (event) => {
  const form = await superValidate(event, resetPasswordSchema);
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, resetPasswordSchema);
    //console.log(form);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await event.locals.pb
        .collection("users")
        .requestPasswordReset(form.data.email);
      message(form, "success");
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

    throw redirect(302, "/auth/reset-password/success");
  },
};
