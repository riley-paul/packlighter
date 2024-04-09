import db from "./drizzle";
import {
  CategoryInsert,
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listsTable,
} from "./schema";
import { ItemInsert, ListInsert } from "./schema";

const USER_ID = "user_2ekgTFQpkuJqHh4Kyt4CQ7gAh6k";

async function seed() {
  const itemsData: ItemInsert[] = [
    {
      user: USER_ID,
      name: "Fleece Jacket",
      description: "Arc'teyx Delta LT",
    },
    {
      user: USER_ID,
      name: "Bear Spray",
    },
    {
      user: USER_ID,
      name: "Tent",
      description: "Big Agnes Copper Spur HV UL2",
    },
    {
      user: USER_ID,
      name: "Sleeping Bag",
      description: "Western Mountaineering UltraLite",
    },
    {
      user: USER_ID,
      name: "Sleeping Pad",
      description: "Therm-a-Rest NeoAir XLite",
    },
    {
      user: USER_ID,
      name: "Stove",
      description: "MSR PocketRocket 2",
    },
    {
      user: USER_ID,
      name: "Pot",
      description: "MSR Ceramic 2-Pot Set",
    },
    {
      user: USER_ID,
      name: "Water Filter",
      description: "Sawyer Squeeze",
    },
    {
      user: USER_ID,
      name: "Headlamp",
      description: "Petzl Actik Core",
    },
    {
      user: USER_ID,
      name: "First Aid Kit",
    },
    {
      user: USER_ID,
      name: "Knife",
      description: "Opinel No. 8",
    },
    {
      user: USER_ID,
      name: "Map",
    },
    {
      user: USER_ID,
      name: "Compass",
    },
    {
      user: USER_ID,
      name: "Lighter",
    },
    {
      user: USER_ID,
      name: "Toothbrush",
    },
    {
      user: USER_ID,
      name: "Toothpaste",
    },
    {
      user: USER_ID,
      name: "Floss",
    },
    {
      user: USER_ID,
      name: "Toilet Paper",
    },
    {
      user: USER_ID,
      name: "Trowel",
    },
    {
      user: USER_ID,
      name: "Hand Sanitizer",
    },
    {
      user: USER_ID,
      name: "Bear Canister",
    },
    {
      user: USER_ID,
      name: "Rope",
      description: "Sterling 9.6mm",
    },
    {
      user: USER_ID,
      name: "Carabiners",
    },
    {
      user: USER_ID,
      name: "Harness",
      description: "Black Diamond Momentum",
    },
    {
      user: USER_ID,
      name: "Helmet",
      description: "Black Diamond Half Dome",
    },
    {
      user: USER_ID,
      name: "Crampons",
    },
  ];

  const listsData: ListInsert[] = [
    {
      user: USER_ID,
      name: "Crag Day",
      description: "Rock climbing at the local crag",
    },
    {
      user: USER_ID,
      name: "Ski Traverse",
      description: "Skiing across the mountains",
    },
    {
      user: USER_ID,
      name: "Multi-Day Hike",
      description: "Multi-day hike in the wilderness",
    },
    {
      user: USER_ID,
      name: "Backpacking Europe",
      description: "Traveling through Europe",
    },
  ];

  await Promise.all([
    db.delete(itemsTable),
    db.delete(categoriesTable),
    db.delete(categoriesItemsTable),
    db.delete(listsTable),
  ]);

  await db.insert(itemsTable).values(itemsData);
  const items = await db.select().from(itemsTable);

  await db.insert(listsTable).values(listsData);
  const lists = await db.select().from(listsTable);

  const categoriesData: CategoryInsert[] = lists.flatMap((list) =>
    [
      {
        list: list.id,
        name: "Clothing",
      },
      {
        list: list.id,
        name: "Shelter",
      },
      {
        list: list.id,
        name: "Sleep System",
      },
      {
        list: list.id,
        name: "Cooking",
      },
      {
        list: list.id,
        name: "Climbing Gear",
      },
      {
        list: list.id,
        name: "Navigation",
      },
      {
        list: list.id,
        name: "Hygiene",
      },
      {
        list: list.id,
        name: "Food",
      },
      {
        list: list.id,
        name: "Safety",
      },
      {
        list: list.id,
        name: "Miscellaneous",
      },
    ].filter(() => Math.random() < 0.5)
  );

  await db.insert(categoriesTable).values(categoriesData);
  const categories = await db.select().from(categoriesTable);

  console.log("seeded");
}

seed();
