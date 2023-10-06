import { buttonVariants } from "@/components/ui/button";
import { Feather } from "lucide-react";
import { Link, Outlet, useRouteError } from "react-router-dom";
import { z } from "zod";

export const Component: React.FC = () => (
  <>
    <header className="h-14 bg-card border-b shadow flex items-center px-6 py-4">
      <Link to="/" className="flex gap-3 items-center">
        <Feather className="h-6 w-6 text-teal-500" />
        <h1 className="font-medium text-lg">PackLighter</h1>
      </Link>
    </header>
    <main className="p-4 overflow-auto">
      <Outlet />
    </main>
  </>
);

const errorSchema = z
  .object({ status: z.string(), data: z.string() })
  .partial();

export const ErrorBoundary: React.FC = () => {
  const errorData = useRouteError();
  const error = errorSchema.parse(errorData);
  console.error(error);

  return (
    <div className="p-4 flex items-center flex-col justify-center gap-10 w-screen h-screen">
      <Feather className="h-24 w-24 text-teal-500" />
      <div className="prose dark:prose-invert">
        <h1>{error.status}</h1>
        <p>{error.data}</p>
      </div>
      <Link to="/" className={buttonVariants({ variant: "secondary" })}>
        Go back home
      </Link>
    </div>
  );
};
