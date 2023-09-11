import pb from "@/lib/pocketbase";
import { ActionFunction, redirect } from "react-router-dom";

export const action: ActionFunction = () => {
  pb.authStore.clear();

  return redirect("/auth");
};
