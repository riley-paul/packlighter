import LoginForm from "@/components/forms/login-form";
import SignupForm from "@/components/forms/signup-form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { createFileRoute } from "@tanstack/react-router";
import { Feather } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: () => (
    <div className="flex w-full h-full items-center justify-center">
      <div className="max-w-xs w-full max-h-[80vh] h-full">
        <div className="mb-8 flex flex-col items-center">
          <Feather size="4rem" className="mb-4 text-primary" />
          <h1 className="mb-1 text-3xl font-bold">PackLighter</h1>
          <p className="text-sm text-muted-foreground">
            The packing tool of champions
          </p>
        </div>
        <Tabs defaultValue="login" className="flex flex-col gap-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
});
