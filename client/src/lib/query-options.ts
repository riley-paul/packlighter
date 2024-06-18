import { queryOptions } from "@tanstack/react-query";
import { api } from "./client.ts";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: async () => {
    const response = await api.auth.me.$get();
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    return await response.json();
  },
});
