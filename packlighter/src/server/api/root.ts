import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";
import listRouter from "./routers/lists";
import categoriesItemsRouter from "./routers/categoriesItems";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  item: itemsRouter,
  list: listRouter,
  category: categoriesRouter,
  categoryItem: categoriesItemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
