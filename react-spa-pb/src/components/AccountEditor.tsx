import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { pb } from "@/lib/pocketbase";
import { useNavigate } from "react-router-dom";
import { RecordModel } from "pocketbase";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export const AccountEditor: React.FC = () => {
  const user = pb.authStore.model as RecordModel;
  const imageUrl = pb.files.getUrl(user, user.avatar, { thumb: "100x100" });

  const navigate = useNavigate();

  return user ? (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex text-sm items-center hover:underline underline-offset-4 cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <User className="h-8" />
            </AvatarFallback>
          </Avatar>
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col">
        <div className="flex gap-4 p-6 bg-muted">
          <Avatar className="h-20 w-20">
            <AvatarImage src={imageUrl} alt="@shadcn" />
            <AvatarFallback>
              <User className="h-8" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="p-6">
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
        </div>
      </SheetContent>
    </Sheet>
  ) : null;
};
