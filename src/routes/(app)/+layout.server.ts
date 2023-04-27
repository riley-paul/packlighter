import prisma from "../../lib/prisma";
import type { PageServerLoad, Actions } from "./$types";


export const load = async () => {
  const lists = await prisma.list.findMany();
  const gear = await prisma.gear.findMany();
  return { lists, gear };
};

