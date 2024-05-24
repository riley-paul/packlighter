import AppHeader from "@/components/app-header";
import { createFileRoute } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  component: () => (
    <div className="h-full">
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
  ),
});
