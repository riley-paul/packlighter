import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Trash, User } from "lucide-react";
import { getProfilePhoto } from "@/api/auth";
import { pb } from "@/lib/pocketbase";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function AccountEditor(): ReturnType<React.FC> {
  const user = pb.authStore.model;
  const imageUrl = getProfilePhoto();

  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex cursor-pointer items-center text-sm underline-offset-4 hover:underline">
          <Avatar className="h-10 w-10">
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <User className="h-8" />
            </AvatarFallback>
          </Avatar>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0">
        {user ? (
          <>
            <div className="flex gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={imageUrl} alt="@shadcn" />
                <AvatarFallback>
                  <User className="h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>
            <Separator className="mt-6" />
            <div className="flex-1 gap-4 flex flex-col overflow-y-auto py-6">
              <Card>
                <form>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>This is irreversible</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="secondary">
                      Change Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              <Card>
                <form>
                  <CardHeader>
                    <CardTitle>Update Email</CardTitle>
                    <CardDescription>This is irreversible</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input type="email" placeholder="New Email" />
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      variant="secondary"
                    >
                      Update Email
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            <footer className="flex flex-col gap-2 pt-2">
              <Button className="w-full" variant="secondary" disabled>
                Delete Account
                <Trash size="1rem" className="ml-2" />
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  pb.authStore.clear();
                  navigate("/auth");
                }}
              >
                Logout
                <LogOut size="1rem" className="ml-2" />
              </Button>
            </footer>
          </>
        ) : (
          "Not logged in"
        )}
      </SheetContent>
    </Sheet>
  );
}
