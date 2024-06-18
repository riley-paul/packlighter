import { db } from ".";
import {
  type CategoryInsert,
  type CategoryItemInsert,
  categoriesItemsTable,
  categoriesTable,
  itemsTable,
  listsTable,
} from "./schema";
import type { ItemInsert, ListInsert } from "./schema";

const USER_ID = "e86515ad-a64c-48e5-a62d-c53d2085fbd4";

async function seed() {
  const itemsData: ItemInsert[] = [
    {
      userId: USER_ID,
      name: "Fleece Jacket",
      description: "Arc'teyx Delta LT",
    },
    {
      userId: USER_ID,
      name: "Bear Spray",
    },
    {
      userId: USER_ID,
      name: "Tent",
      description: "Big Agnes Copper Spur HV UL2",
    },
    {
      userId: USER_ID,
      name: "Sleeping Bag",
      description: "Western Mountaineering UltraLite",
    },
    {
      userId: USER_ID,
      name: "Sleeping Pad",
      description: "Therm-a-Rest NeoAir XLite",
    },
    {
      userId: USER_ID,
      name: "Stove",
      description: "MSR PocketRocket 2",
    },
    {
      userId: USER_ID,
      name: "Pot",
      description: "MSR Ceramic 2-Pot Set",
    },
    {
      userId: USER_ID,
      name: "Water Filter",
      description: "Sawyer Squeeze",
    },
    {
      userId: USER_ID,
      name: "Headlamp",
      description: "Petzl Actik Core",
    },
    {
      userId: USER_ID,
      name: "First Aid Kit",
    },
    {
      userId: USER_ID,
      name: "Knife",
      description: "Opinel No. 8",
    },
    {
      userId: USER_ID,
      name: "Map",
    },
    {
      userId: USER_ID,
      name: "Compass",
    },
    {
      userId: USER_ID,
      name: "Lighter",
    },
    {
      userId: USER_ID,
      name: "Toothbrush",
    },
    {
      userId: USER_ID,
      name: "Toothpaste",
    },
    {
      userId: USER_ID,
      name: "Floss",
    },
    {
      userId: USER_ID,
      name: "Toilet Paper",
    },
    {
      userId: USER_ID,
      name: "Trowel",
    },
    {
      userId: USER_ID,
      name: "Hand Sanitizer",
    },
    {
      userId: USER_ID,
      name: "Bear Canister",
    },
    {
      userId: USER_ID,
      name: "Rope",
      description: "Sterling 9.6mm",
    },
    {
      userId: USER_ID,
      name: "Carabiners",
    },
    {
      userId: USER_ID,
      name: "Harness",
      description: "Black Diamond Momentum",
    },
    {
      userId: USER_ID,
      name: "Helmet",
      description: "Black Diamond Half Dome",
    },
    {
      userId: USER_ID,
      name: "Crampons",
    },
  ].map((item) => ({ ...item, weight: Math.random() * 1000 }));

  const listsData: ListInsert[] = [
    {
      userId: USER_ID,
      name: "Crag Day",
      description: "Rock climbing at the local crag",
    },
    {
      userId: USER_ID,
      name: "Ski Traverse",
      description: "Skiing across the mountains",
    },
    {
      userId: USER_ID,
      name: "Multi-Day Hike",
      description: "Multi-day hike in the wilderness",
    },
    {
      userId: USER_ID,
      name: "Backpacking Europe",
      description: "Traveling through Europe",
    },
  ];

  await db.delete(listsTable);
  await db.delete(itemsTable);
  await db.delete(categoriesTable);
  await db.delete(categoriesItemsTable);
  console.log("\n\n------ DATA CLEARED ------ \n\n");

  await db.insert(itemsTable).values(itemsData);
  const items = await db.select().from(itemsTable);

  await db.insert(listsTable).values(listsData);
  const lists = await db.select().from(listsTable);

  const categoriesData: CategoryInsert[] = lists.flatMap((list) =>
    [
      {
        userId: USER_ID,
        list: list.id,
        name: "Clothing",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Shelter",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Sleep System",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Cooking",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Climbing Gear",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Navigation",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Hygiene",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Food",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Safety",
      },
      {
        userId: USER_ID,
        list: list.id,
        name: "Miscellaneous",
      },
    ].filter(() => Math.random() < 0.5),
  );

  await db.insert(categoriesTable).values(categoriesData);
  const categories = await db.select().from(categoriesTable);

  const categoriesItemsData: CategoryItemInsert[] = categories.flatMap(
    (category) =>
      items
        .filter(() => Math.random() < 0.2)
        .flatMap((item) => ({
          userId: USER_ID,
          category: category.id,
          item: item.id,
        })),
  );

  await db.insert(categoriesItemsTable).values(categoriesItemsData);

  console.log("seeded");
}

seed();
