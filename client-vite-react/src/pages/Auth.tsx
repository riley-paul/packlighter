import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";

export const Component: React.FC = () => {
  return (
    <main className="flex justify-center h-full pt-24">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Form action="/api/auth/login" method="post">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <FontAwesomeIcon icon={faPaperPlane} className="h-4 mr-2" />
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </TabsContent>
        <TabsContent value="signup">
          <Form action="/api/auth/signup" method="post">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input type="text" name="name" placeholder="Name" />
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <Input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <FontAwesomeIcon icon={faPaperPlane} className="h-4 mr-2" />
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </TabsContent>
      </Tabs>
    </main>
  );
};
