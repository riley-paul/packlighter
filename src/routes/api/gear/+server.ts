import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const GET: RequestHandler = async () => {
  return json(await prisma.gear.findMany());
};

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  return json(await prisma.gear.create({ data }));
};
