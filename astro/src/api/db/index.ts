import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const url = import.meta.env?.DATABASE_URL || process.env.DATABASE_URL;
const authToken =
  import.meta.env?.DATABASE_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
