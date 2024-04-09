import db from "../drizzle";
import { itemsTable, listsTable } from "../schema";
import { itemsData, listsData } from "./data";
import "dotenv/config";

async function seed() {
  await db.delete(itemsTable);
  await db.insert(itemsTable).values(itemsData);
  const items = await db.select().from(itemsTable);

  await db.delete(listsTable);
  await db.insert(listsTable).values(listsData);
  const lists = await db.select().from(listsTable);

  console.log("seeded");
}

seed();
