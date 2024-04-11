import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export enum CacheKeys {
  Lists = "lists",
  Items = "items",
}
