import AppHeader from "@/components/app-header";
import Error from "@/components/base/error";
import Logo from "@/components/logo";
import React from "react";
import { type ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage(): ReturnType<React.FC> {
  const error = useRouteError() as ErrorResponse & Error;
  console.error(error);

  return (
    <div className="h-full flex flex-col">
      <AppHeader>
        <Logo />
      </AppHeader>
      <Error error={error} showGoHome />
    </div>
  );
}
