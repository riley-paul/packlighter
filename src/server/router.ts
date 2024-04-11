import { router } from "./trpc";
import listRouter from "./routers/lists";

export const appRouter = router({
  lists: listRouter,
});

export type AppRouter = typeof appRouter;
