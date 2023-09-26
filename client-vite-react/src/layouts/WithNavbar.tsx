import { Button } from "@/components/ui/button";
import { faBars, faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export const WithNavbar: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-6 py-3 border-b shadow">
        <a href="/" className="flex items-center">
          <FontAwesomeIcon
            icon={faFeather}
            className="h-5 mr-3 text-teal-500"
          />
          <div className="font-medium">PackLighter</div>
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="text-left">
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <NavigationMenu className="py-2">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink to="/auth">
                    <NavigationMenuLink>Sign In</NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </header>
      <Outlet />
    </div>
  );
};
