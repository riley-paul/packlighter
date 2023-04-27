import prisma from "$lib/prisma";
import { to_number } from "svelte/internal";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const list = await prisma.list.findUnique({
    where: { id: to_number(params.id) },
    include: { categories: true },
  });
  return { list };
};

export const actions: Actions = {
  updateList: async ({ request, params }) => {
    const data = await request.formData();
    const newList = await prisma.list.update({
      where: { id: to_number(params.id) },
      data: {
        name: data.get("name")?.toString(),
        description: data.get("description")?.toString(),
      },
    });
  },
};
