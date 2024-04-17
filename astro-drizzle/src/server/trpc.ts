import { TRPCError, initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";

interface ContextProps {
  locals: App.Locals;
  req: Request;
}

export function createContext({ req, locals }: ContextProps) {
  const { userId } = locals.auth();
  return { req, locals, userId };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const isLoggedIn = middleware(async ({ ctx, next }) => {
  const { userId } = ctx;

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({
    ctx: { ...ctx, userId },
  });
});

export const privateProcedure = publicProcedure.use(isLoggedIn);
