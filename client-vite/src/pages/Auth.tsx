import React from "react";
import { Feather } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/loginForm";
import { SignUpForm } from "@/components/signUpForm";

export const Component: React.FC = () => (
  <div className="container max-w-sm">
    <div className="flex flex-col py-8 items-center">
      <Feather className="h-16 w-16 text-teal-500 mb-4" />
      <h1 className="text-3xl font-bold mb-1">PackLighter</h1>
      <p className="text-sm text-muted-foreground">
        The packing tool of champions
      </p>
    </div>
    <Tabs defaultValue="login">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  </div>
);
