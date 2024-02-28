import { Bug } from "lucide-react";
import React from "react";

interface Props {
  message?: string;
}

const Error: React.FC<Props> = (props) => {
  const { message } = props;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col max-w-xs px-4 items-center text-center gap-4">
        <Bug className="w-8 h-8 animate-bounce text-primary" />
        <span className="text-sm text-muted-foreground">
          {message ?? "Application Error"}
        </span>
      </div>
    </div>
  );
};

export default Error;
