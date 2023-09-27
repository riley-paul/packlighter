import { z, type SuperRefinement } from "zod";

const userSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" })
    .trim(),
  username: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username is required" })
    .trim()
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password must be less than 72 characters" })
    .trim(),
  passwordConfirm: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password must be less than 72 characters" })
    .trim(),
});

export const updatePasswordSchema = userSchema
  .pick({ password: true, passwordConfirm: true })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password and Confirm Password must match",
        path: ["confirmPassword"],
      });
    }
  });

export const signInSchema = userSchema.pick({ email: true, password: true });

export const signUpSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
    passwordConfirm: true,
    terms: true,
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password and Confirm Password must match",
        path: ["confirmPassword"],
      });
    }
  });

export const resetPasswordSchema = userSchema.pick({ email: true });
