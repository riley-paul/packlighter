import { eq } from "drizzle-orm";
import { db } from "./index.ts";
import { userTable } from "./schema.ts";

const getUserId = async (username: string) => {
  const userId = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .then((rows) => rows[0].id);
  if (!userId) {
    throw new Error("User not found");
  }
  return userId;
};

async function seed() {
  const userId = await getUserId("admin");
}

seed()
  .then(() => {
    console.log("Seeded DB");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
