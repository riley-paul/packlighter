import { meQueryOptions } from "@/lib/query-options.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Component: React.FC = () => {
  const meQuery = useQuery(meQueryOptions);

  return (
    <div>
      <div>Hello /welcome!</div>
      <div>{meQuery.data}</div>
    </div>
  );
};

export const Route = createFileRoute("/welcome")({
  component: Component,
});
