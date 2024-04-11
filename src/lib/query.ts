import { QueryClient } from "@tanstack/react-query";
import type { z } from "zod";

export const queryClient = new QueryClient();

export enum CacheKeys {
  List = "list",
}

export async function fetchSafely<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return schema.parse(data);
}
