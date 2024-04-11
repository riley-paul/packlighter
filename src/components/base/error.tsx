import { Bug } from "lucide-react";
import React from "react";
import { type ErrorResponse, isRouteErrorResponse } from "react-router-dom";
import { Button } from "../ui/button";
import { cn, getPaths } from "@/lib/utils";

interface Props {
  error: Error | ErrorResponse | null;
  showGoHome?: boolean;
  retry?: () => void;
  small?: boolean;
}

const Error: React.FC<Props> = (props) => {
  const { error, showGoHome, retry, small } = props;

  const status = error && "status" in error ? error.status : 500;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error?.message ??
      "An unknown error occurred. Please try again later or contact support.";

  return (
    <div className="flex-1 flex items-center justify-center h-full">
      <div className="flex flex-col gap-4 max-w-sm w-full p-4 max-h-[50%] h-full">
        <div
          className={cn(
            "flex flex-row gap-4 items-center",
            small && "flex-col gap-2"
          )}
        >
          <Bug
            size={small ? "2rem" : "3rem"}
            className="text-primary flex-shrink-0"
          />
          <div className="flex flex-col">
            <h2 className="font-bold mr-2 text-lg">{status} Error</h2>
            <p className="text-muted-foreground text-sm">{message}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {retry && <Button onClick={() => retry()}>Retry</Button>}
          {showGoHome && (
            <Button
              variant="secondary"
              onClick={() => (window.location.href = getPaths.home())}
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
