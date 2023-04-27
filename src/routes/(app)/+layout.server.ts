import prisma from "../../lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const lists = await prisma.list.findMany();
  const gear = await prisma.gear.findMany();
  return { lists, gear };
};
