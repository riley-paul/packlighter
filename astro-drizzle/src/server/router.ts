import { router } from "./trpc";
import listRouter from "./routers/lists";
import itemsRouter from "./routers/items";
import categoriesRouter from "./routers/categories";
import categoriesItemsRouter from "./routers/categoriesItems";

export const appRouter = router({
  lists: listRouter,
  items: itemsRouter,
  categories: categoriesRouter,
  categoriesItems: categoriesItemsRouter,
});

export type AppRouter = typeof appRouter;
