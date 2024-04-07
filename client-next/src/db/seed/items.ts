import db from "../drizzle";
import { itemsTable } from "../schema";

const USER_ID = "user_2ekgTFQpkuJqHh4Kyt4CQ7gAh6k";

const seedItems = async () => {
  const itemsData: (typeof itemsTable.$inferInsert)[] = [
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

  try {
    await db.delete(itemsTable);
    await db.insert(itemsTable).values(itemsData);
    const items = await db.select().from(itemsTable);
    console.log("Items seeded:", items);
  } catch (error) {
    console.error("Error seeding items:", error);
  }
};

export default seedItems;
