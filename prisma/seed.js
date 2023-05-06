import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import fs from "fs/promises";

const data = JSON.parse(await fs.readFile("./prisma/seeds/gear.json"));

await prisma.gear.createMany({ data });
