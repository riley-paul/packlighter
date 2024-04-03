import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { LoginSchema, login, loginSchema } from "@/api/auth";
import { Loader2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { getPaths } from "@/lib/utils";

const defaultForm: LoginSchema = {
  email: "",
  password: "",
};

export default function LoginForm(): ReturnType<React.FC> {
  const methods = useForm<LoginSchema>({
    defaultValues: defaultForm,
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const submitMutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate(getPaths.home()),
    onError: (error: ClientResponseError) => {
      console.error(error);
      toast.error("Login failed", {
        description: error.message,
      });
    },
  });

  const onSubmit = handleSubmit(
    (data) => submitMutation.mutate(data),
    (formErrors) => {
      console.error(formErrors);
    }
  );

  return (
    <Form {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <FormField<LoginSchema, "email">
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
            <FormField<LoginSchema, "password">
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
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              disabled={submitMutation.isLoading}
            >
              {submitMutation.isLoading ? (
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
