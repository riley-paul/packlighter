import { Loader2 } from "lucide-react";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
        <span className="text-muted-foreground text-sm">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
