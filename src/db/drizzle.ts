import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

const client = createClient({
  url: import.meta.env.TURSO_CONNECTION_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN!,
});
const db = drizzle(client, { schema });

// await migrate(db, { migrationsFolder: "drizzle" });

export default db;
