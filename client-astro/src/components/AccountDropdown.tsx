import type PocketBase from "pocketbase";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  user: PocketBase["authStore"]["model"] | undefined;
  imageUrl: string;
}

export const AccountDropdown: React.FC<Props> = (props) => {
  return props.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex text-sm items-center hover:underline underline-offset-4 cursor-pointer">
          Welcome, {props.user.name}
          <Avatar className="h-6 w-6 ml-2">
            <AvatarImage src={props.imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <FontAwesomeIcon icon={faUser} />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
