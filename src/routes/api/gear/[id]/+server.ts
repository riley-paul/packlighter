import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import { to_number } from "svelte/internal";

export const GET: RequestHandler = async ({ params }) => {
  return json(
    await prisma.gear.findUnique({ where: { id: to_number(params.id) } })
  );
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  const data = await request.json();
  return json(
    await prisma.gear.update({ where: { id: to_number(params.id) }, data })
  );
};

export const DELETE: RequestHandler = async ({ request, params }) => {
  return json(
    await prisma.gear.delete({ where: { id: to_number(params.id) } })
  );
};
