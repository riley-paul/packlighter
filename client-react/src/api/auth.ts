import { pb } from "@/lib/pocketbase";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginSchema = z.infer<typeof loginSchema>;
export const login = (data: LoginSchema) =>
  pb.collection("users").authWithPassword(data.email, data.password);

export const signUpSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUp = (data: SignUpSchema) =>
  pb.collection("users").create(data);
