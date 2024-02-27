import LoginForm from "@/components/forms/login-form";
import SignUpForm from "@/components/forms/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Feather } from "lucide-react";
import React from "react";

export default function AuthPage(): ReturnType<React.FC> {
  return (
    <div className="max-w-sm w-full py-12 mx-auto">
      <div className="mb-8 flex flex-col items-center">
        <Feather className="mb-4 h-16 w-16 text-primary" />
        <h1 className="mb-1 text-3xl font-bold">PackLighter</h1>
        <p className="text-sm text-muted-foreground">
          The packing tool of champions
        </p>
      </div>
      <Tabs value="login" className="flex flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
