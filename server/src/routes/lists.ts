import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono()
  .use(async (c, next) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      c.status(401);
      return c.text("Unauthorized");
    }

    await next();
  })
  .get("/", (c) => {
    return c.text("all lists");
  })
  .post("/", (c) => c.text("create list"))
  .get("/:id", (c) => c.text(`list ${c.req.param("id")}`))
  .put("/:id", (c) => c.text(`update list ${c.req.param("id")}`))
  .delete("/:id", (c) => c.text(`delete list ${c.req.param("id")}`));

export default app;
