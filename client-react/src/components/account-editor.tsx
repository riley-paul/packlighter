import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { getProfilePhoto } from "@/api/auth";
import { pb } from "@/lib/pocketbase";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

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
      <SheetContent className="flex flex-col">
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
            <Separator className="my-4" />
            <div className="flex-1"></div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                pb.authStore.clear();
                navigate("/auth");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          "Not logged in"
        )}
      </SheetContent>
    </Sheet>
  );
}
