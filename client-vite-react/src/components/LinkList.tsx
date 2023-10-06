import { cn } from "@/lib/utils";
import { ChevronRight, GripVertical } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";

interface Link {
  name: string;
  link: string;
  class?: string;
}

interface Props {
  links: Link[];
}

export const LinkList: React.FC<Props> = ({ links }) => {
  return (
    <ul className="grid border rounded-md px-4 bg-background divide-y">
      {links.map((link) => (
        <li className="grid grid-cols-[auto_1fr] items-center gap-2">
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-8 w-6 justify-center"
            )}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <a
            className={cn({ "opacity-50": !link.name }, link.class)}
            href={link.link}
          >
            <div className="text-sm flex w-full justify-between items-center py-2">
              {link.name}
              <ChevronRight className="text-muted-foreground"/>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};
