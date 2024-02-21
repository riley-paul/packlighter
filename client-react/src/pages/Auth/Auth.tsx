import { Card } from "@/components/ui/card";
import React from "react";
import LoginForm from "./LoginForm";

export default function Auth(): ReturnType<React.FC> {
  return (
    <Card className="mx-auto my-auto max-w-lg w-full">
      <LoginForm />
    </Card>
  );
}
