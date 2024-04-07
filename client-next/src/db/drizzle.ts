import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

const client = createClient({ url: "file:local.db" });
const db = drizzle(client);

await migrate(db, { migrationsFolder: "drizzle" });

export default db;
