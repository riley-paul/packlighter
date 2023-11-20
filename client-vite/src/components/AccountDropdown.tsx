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
import { pb } from "@/lib/pocketbase";
import { useNavigate } from "react-router-dom";

export const AccountDropdown: React.FC = () => {
  const user = pb.authStore.model;
  const imageUrl = user?.imageUrl;

  const navigate = useNavigate();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex text-sm items-center hover:underline underline-offset-4 cursor-pointer">
          <Avatar className="h-10 w-10 ml-2">
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <User className="h-8" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <a href="/account">
            <DropdownMenuItem>Account Settings</DropdownMenuItem>
          </a>
          <button
            type="submit"
            className="w-full"
            onClick={() => {
              pb.authStore.clear();
              navigate("/auth");
            }}
          >
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};
