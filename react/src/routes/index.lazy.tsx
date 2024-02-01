import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index(): ReturnType<React.FC> {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
