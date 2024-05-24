import { Hono } from "hono";
import { db } from "../db";
import { emailInsertSchema, emailsTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import authMiddleware from "../middleware/auth";

const paramValidator = zValidator("param", z.object({ id: z.string() }));
const queryValidator = zValidator("query", z.object({ redirect: z.string() }));
const formValidator = zValidator(
  "form",
  emailInsertSchema.omit({ userId: true }).extend({
    tester: z.coerce.boolean(),
  }),
);

const app = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const userId = c.get("user").id;
    const emails = await db
      .select()
      .from(emailsTable)
      .where(eq(emailsTable.userId, userId))
      .orderBy(emailsTable.createdAt);
    return c.json(emails);
  })
  .post("/", formValidator, queryValidator, async (c) => {
    const userId = c.get("user").id;
    const data = c.req.valid("form");
    const { redirect } = c.req.valid("query");
    await db.insert(emailsTable).values({ ...data, userId });
    return c.redirect(redirect);
  })
  .post("/:id/delete", paramValidator, queryValidator, async (c) => {
    const userId = c.get("user").id;
    const { id } = c.req.valid("param");
    const { redirect } = c.req.valid("query");
    await db
      .delete(emailsTable)
      .where(and(eq(emailsTable.userId, userId), eq(emailsTable.id, id)));
    return c.redirect(redirect);
  });

export default app;
