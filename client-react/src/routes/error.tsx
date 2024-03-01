import AppHeader from "@/components/app-header";
import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { Bug } from "lucide-react";
import React from "react";
import { ErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage(): ReturnType<React.FC> {
  const error = useRouteError() as ErrorResponse & Error;
  console.error(error);

  return (
    <div className="h-screen flex flex-col">
      <AppHeader>
        <Logo />
      </AppHeader>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 max-w-sm w-full p-4 max-h-[50vh] h-full">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Bug size="3rem" className="text-primary flex-shrink-0" />
            <div className="flex flex-col">
              <h2 className="font-bold mr-2 text-lg">
                <span className="">{error.status || 500} Error</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                {error.statusText ||
                  error.message ||
                  "An unknown error occurred. Please try again later or contact support."}
              </p>
            </div>
          </div>
          <Link className={buttonVariants({ variant: "secondary" })} to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
