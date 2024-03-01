import AppHeader from "@/components/app-header";
import { HomeIcon } from "lucide-react";
import React from "react";

export default function Home(): ReturnType<React.FC> {
  return (
    <div className="h-screen">
      <AppHeader />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-2 items-center max-h-[50vh] h-full">
          <HomeIcon size="4rem" className="text-primary" />
          <h2 className="text-2xl font-bold">Welcome to Packlighter</h2>
          <p className="text-muted-foreground text-sm">
            Select a list to get packing
          </p>
        </div>
      </div>
    </div>
  );
}
