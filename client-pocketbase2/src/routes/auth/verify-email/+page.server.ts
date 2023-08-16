import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
  if (!event.locals.pb.authStore.isValid) throw redirect(302, "/auth/sign-in");

};

export const actions: Actions = {
	default: async (event) => {
		const email = event.locals.user.email
		event.locals.pb.collection("users").requestVerification(email)
    throw redirect(302, "/auth/reset-password/success");
	}
};