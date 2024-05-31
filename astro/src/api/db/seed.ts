import { eq } from "drizzle-orm";
import { db } from ".";
import { userTable } from "./schema";

const userId = await db
  .select()
  .from(userTable)
  .where(eq(userTable.username, "rjp301"))
  .then((rows) => rows[0].id);

if (!userId) {
  throw new Error("User not found");
}

async function seed() {}

seed()
  .then(() => {
    console.log("Seeded DB");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
