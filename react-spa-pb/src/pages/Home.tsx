import { Home } from "lucide-react";
import React from "react";

export const Component: React.FC = () => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Home className="text-primary h-16 w-16 mb-4" />
      <h1 className="text-3xl font-bold mb-1">Home</h1>
      <p className="text-sm text-muted-foreground">
        Select a list to get packing
      </p>
    </div>
  </div>
);
