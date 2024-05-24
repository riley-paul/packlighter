import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AtSign, Lock, LogOut, Trash, User } from "lucide-react";
import { getProfilePhoto } from "@/actions/auth";
import { pb } from "@/lib/pocketbase";
import { queryClient } from "@/lib/query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChangeEmailDialog from "./forms/change-email-dialog";
import ChangePasswordDialog from "./forms/change-password-dialog";
import DeleteAccountDialog from "./forms/delete-account-dialog";
import { useNavigate } from "@tanstack/react-router";

export default function AccountEditor(): ReturnType<React.FC> {
  const user = pb.authStore.model;
  const imageUrl = getProfilePhoto();

  const [isEmailDialogOpen, setIsEmailDialogOpen] = React.useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
  const [isDeteteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const navigate = useNavigate();

  const logout = () => {
    pb.authStore.clear();
    navigate({ to: "/auth" });
    queryClient.removeQueries();
  };

  if (!user) return null;

  return (
    <>
      <ChangeEmailDialog
        isOpen={isEmailDialogOpen}
        setIsOpen={setIsEmailDialogOpen}
      />
      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        setIsOpen={setIsPasswordDialogOpen}
      />
      <DeleteAccountDialog
        isOpen={isDeteteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex cursor-pointer items-center text-sm underline-offset-4 hover:underline">
            <Avatar className="h-10 w-10">
              <AvatarImage src={imageUrl} alt="@shadcn" />
              <AvatarFallback>
                <User className="h-8" />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex gap-4 p-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={imageUrl} alt="@shadcn" />
              <AvatarFallback>
                <User size="3rem" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsEmailDialogOpen(true)}>
              Change Email
              <DropdownMenuShortcut>
                <AtSign size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPasswordDialogOpen(true)}>
              Change Password
              <DropdownMenuShortcut>
                <Lock size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
              Delete Account
              <DropdownMenuShortcut>
                <Trash size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Logout
            <DropdownMenuShortcut>
              <LogOut size="1rem" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
