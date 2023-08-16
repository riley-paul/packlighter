import prisma from "$lib/config/prisma";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, params }) => {
  const { user } = locals;

  const item = await prisma.list.findUnique({
    where: { id: params.id },
    include: {
      list_gear: true,
    },
  });
  if (!item) throw error(404, "Resource not found");
  if (item.user_id !== user.id) throw error(403, "Cannot access this resource");

  return json(item);
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  const { user } = locals;

  const item = await prisma.list.findUnique({ where: { id: params.id } });
  if (item?.user_id !== user.id)
    throw error(403, "Cannot access this resource");

  return json(await prisma.list.delete({ where: { id: params.id } }));
};
