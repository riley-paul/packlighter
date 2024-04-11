import { router } from "./trpc";
import listRouter from "./routers/lists";
import itemsRouter from "./routers/items";
import categoriesRouter from "./routers/categories";

export const appRouter = router({
  lists: listRouter,
  items: itemsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
