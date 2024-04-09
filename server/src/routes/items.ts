import { Hono } from "hono";

const app = new Hono()
  .get("/", (c) => c.text("all items"))
  .post("/", (c) => c.text("create item"))
  .get("/:id", (c) => c.text(`item ${c.req.param("id")}`))
  .put("/:id", (c) => c.text(`update item ${c.req.param("id")}`))
  .delete("/:id", (c) => c.text(`delete item ${c.req.param("id")}`));

export default app;
