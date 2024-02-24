import { pb } from "@/lib/pocketbase";

export const login = (email: string, password: string) =>
  pb.collection("users").authWithPassword(email, password);
