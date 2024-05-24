import AppHeader from "@/components/app-header";
import Error from "@/components/base/error";
import Logo from "@/components/logo";
import { ErrorComponentProps } from "@tanstack/react-router";
import React from "react";

export default function RouterError(
  props: ErrorComponentProps
): ReturnType<React.FC> {
  const { error } = props;
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
