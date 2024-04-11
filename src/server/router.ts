import { router } from "./trpc";
import listRouter from "./routers/lists";
import itemsRouter from "./routers/items";

export const appRouter = router({
  lists: listRouter,
  items: itemsRouter,
});

export type AppRouter = typeof appRouter;
