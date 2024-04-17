/* eslint-disable drizzle/enforce-delete-with-where */
import { db } from ".";
import {
  type CategoryInsert,
  type CategoryItemInsert,
  categoriesItems,
  categories,
  items,
  lists,
} from "./schema";
import type { ItemInsert, ListInsert } from "./schema";

const USER_ID = "50316928-88cc-4cbe-a367-6d9ae02adccb";

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

  await db.delete(lists);
  await db.delete(items);
  await db.delete(categories);
  await db.delete(categoriesItems);
  console.log("\n\n------ DATA CLEARED ------ \n\n");

  await db.insert(items).values(itemsData);
  const itemsResults = await db.select().from(items);

  await db.insert(lists).values(listsData);
  const listsResults = await db.select().from(lists);

  const categoriesData: CategoryInsert[] = listsResults.flatMap((list) =>
    [
      {
        listId: list.id,
        name: "Clothing",
      },
      {
        listId: list.id,
        name: "Shelter",
      },
      {
        listId: list.id,
        name: "Sleep System",
      },
      {
        listId: list.id,
        name: "Cooking",
      },
      {
        listId: list.id,
        name: "Climbing Gear",
      },
      {
        listId: list.id,
        name: "Navigation",
      },
      {
        listId: list.id,
        name: "Hygiene",
      },
      {
        listId: list.id,
        name: "Food",
      },
      {
        listId: list.id,
        name: "Safety",
      },
      {
        listId: list.id,
        name: "Miscellaneous",
      },
    ].filter(() => Math.random() < 0.5),
  );

  await db.insert(categories).values(categoriesData);
  const categoriesResults = await db.select().from(categories);

  const categoriesItemsData: CategoryItemInsert[] = categoriesResults.flatMap(
    (category) =>
      itemsResults
        .filter(() => Math.random() < 0.2)
        .flatMap((item) => ({
          categoryId: category.id,
          itemId: item.id,
        })),
  );

  await db.insert(categoriesItems).values(categoriesItemsData);

  console.log("seeded");
}

await seed();
