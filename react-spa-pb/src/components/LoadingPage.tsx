import { Loader2 } from "lucide-react";

export const LoadingPage: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Loader2 className="w-6 h-6 mr-2 animate-spin text-accent-foreground" />
    Loading...
  </div>
);
