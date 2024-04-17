import { Bug } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  error: Error | null;
  showGoHome?: boolean;
  retry?: () => void;
  small?: boolean;
}

const Error: React.FC<Props> = (props) => {
  const { error, showGoHome, retry, small } = props;

  const status = error && "status" in error ? error.status : 500;

  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="flex h-full max-h-[50%] w-full max-w-sm flex-col gap-4 p-4">
        <div
          className={cn(
            "flex flex-row items-center gap-4",
            small && "flex-col gap-2",
          )}
        >
          <Bug
            size={small ? "2rem" : "3rem"}
            className="flex-shrink-0 text-primary"
          />
          <div className="flex flex-col">
            <h2 className="mr-2 text-lg font-bold">{500} Error</h2>
            <p className="text-sm text-muted-foreground">{error?.message}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {retry && <Button onClick={() => retry()}>Retry</Button>}
          {showGoHome && (
            <Button
              variant="secondary"
            >
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
