import type PocketBase from "pocketbase";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface Props {
  user: PocketBase["authStore"]["model"] | undefined;
  imageUrl: string;
}

export const AccountDropdown: React.FC<Props> = (props) => {
  return props.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex text-sm items-center hover:underline underline-offset-4 cursor-pointer">
          <Avatar className="h-10 w-10 ml-2">
            <AvatarImage src={props.imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <User className="h-8" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{props.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a href="/account">
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
          </a>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="w-full">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};
