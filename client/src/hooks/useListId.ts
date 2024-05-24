import { useParams } from "@tanstack/react-router";

export default function useListId(): string {
  const params = useParams({ strict: false });
  return "listId" in params ? params.listId : "";
}
