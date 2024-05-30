import React from "react";
import { Button, buttonVariants } from "./ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

const GithubLoginButton: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <a
      href="/api/auth/login/github"
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "no-underline text-[#e6edf3] bg-[#02040a] hover:bg-[#0d1116] border border-[#30363d]",
        className
      )}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" />
      Login with Github
    </a>
  );
};

export default GithubLoginButton;
