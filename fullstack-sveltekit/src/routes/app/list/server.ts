import prisma from "$lib/config/prisma";
import type { RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
  const { userId } = locals.user;

  return json(
    await prisma.list.findMany({
      where: { user_id: userId },
      select: { name: true, description: true },
      orderBy: { name: "asc" },
    })
  );
};

export const POST: RequestHandler = async ({ locals }) => {
  const { userId } = locals.user;

  return json(
    await prisma.list.create({
      data: {
        user_id: userId,
      },
    })
  );
};
