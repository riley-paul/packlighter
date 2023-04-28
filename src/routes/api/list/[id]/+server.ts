import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import prisma from "$lib/prisma";
import { to_number } from "svelte/internal";

export const GET: RequestHandler = async ({ params }) => {
  return json(
    await prisma.list.findUnique({
      where: { id: to_number(params.id) },
      include: {
        categories: { include: { gear: { include: { gear: true } } } },
      },
    })
  );
};

export const PATCH: RequestHandler = async ({ request, params }) => {
  const data = await request.json();
  const { name, description } = data;
  return json(
    await prisma.list.update({
      where: { id: to_number(params.id) },
      data: { name, description },
    })
  );
};

export const DELETE: RequestHandler = async ({ request, params }) => {
  return json(
    await prisma.list.delete({ where: { id: to_number(params.id) } })
  );
};
