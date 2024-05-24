import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignUpSchema, signUp, signUpSchema } from "@/actions/auth";
import { Loader2, Send } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "@tanstack/react-router";

const defaultForm: SignUpSchema = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function SignupForm(): ReturnType<React.FC> {
  const methods = useForm<SignUpSchema>({
    defaultValues: defaultForm,
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const submitToastId = React.useRef<string | number | undefined>(undefined);
  const submitMutation = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      submitToastId.current = toast.loading("Signing up...");
    },
    onSuccess: () => {
      navigate({ to: "/" });
      toast.success("Signed up successfully", { id: submitToastId.current });
    },
    onError: (error: ClientResponseError) => {
      console.error(error);
      toast.error("Sign Up failed", {
        description: error.message,
        id: submitToastId.current,
      });
    },
  });

  const onSubmit = handleSubmit(
    (data) => submitMutation.mutate(data),
    (formErrors) => {
      console.error(formErrors);
      toast.error("Check your info once again. Something isn't quite right");
    }
  );

  return (
    <Form {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <FormField<SignUpSchema, "username">
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="John Johnson" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<SignUpSchema, "email">
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ultra_light@gmail.com"
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<SignUpSchema, "password">
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField<SignUpSchema, "passwordConfirm">
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <Loader2 size="1rem" className="animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
}
