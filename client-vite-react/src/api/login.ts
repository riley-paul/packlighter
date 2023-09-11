import pb from "@/lib/pocketbase";
import { ClientResponseError } from "pocketbase";
import { ActionFunction, redirect } from "react-router-dom";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    await pb
      .collection("users")
      .authWithPassword(String(userData.email), String(userData.password));
    console.log("logged in");
  } catch (err) {
    const error = err as ClientResponseError;
    console.error("pocketbase error", err);
    throw new Response(null, {
      status: error.status,
      statusText: error.message,
    });
  }

  return redirect("/");
};
