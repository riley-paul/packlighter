import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { createContext } from "@/server/trpc";
import { appRouter } from "@/server/router";

export const ALL: APIRoute = ({ request, locals }) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: request,
    router: appRouter,
    createContext: () => createContext({ req: request, locals }),
    onError({ error, path }) {
      console.error(`tRPC Error on '${path}'`, error);
    },
  });
};
