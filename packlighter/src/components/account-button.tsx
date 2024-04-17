import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "astro-clerk-auth/client/react";
import React from "react";
import { buttonVariants } from "./ui/button";

const AccountButton: React.FC = () => {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" signInUrl="/sign-in" />
      </SignedIn>
      <SignedOut>
        <a href="/sign-in" className={cn(buttonVariants())}>
          Sign in
        </a>
      </SignedOut>
    </>
  );
};

export default AccountButton;
