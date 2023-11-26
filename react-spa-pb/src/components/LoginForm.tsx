import React from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { pb } from "@/lib/pocketbase";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ClientResponseError } from "pocketbase";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useForm } from "react-hook-form";
// import { AlertTriangle } from "lucide-react";
// import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Schema = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  const { control, handleSubmit } = methods;

  const [error, setError] = React.useState<string | null>(null);

  const submitForm = async (data: Schema) => {
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
      toast({ title: "🟢 Successfully Logged in" });
      navigate("/");
    } catch (error) {
      console.error((error as ClientResponseError).data);
      setError((error as ClientResponseError).data.message);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && (
          <Alert variant="destructive" className="mb-1">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
