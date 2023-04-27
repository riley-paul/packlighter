import prisma from "$lib/prisma";
import { to_number } from "svelte/internal";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const list = await prisma.list.findUnique({
    where: { id: to_number(params.id) },
    include: { categories: { include: { gear: true } } },
  });
  return { list };
};

export const actions: Actions = {
  updateList: async ({ request, params }) => {
    const data = await request.formData();
    await prisma.list.update({
      where: { id: to_number(params.id) },
      data: {
        name: data.get("name")?.toString(),
        description: data.get("description")?.toString(),
      },
    });
  },
  addCategory: async ({ params }) => {
    await prisma.listCategory.create({
      data: { listId: to_number(params.id) },
    });
  },
  addGear: async ({ params }) => {
    await prisma.listCategory.create({
      data: { listId: to_number(params.id) },
    });
  },
  updateListCategory: async ({ request, params }) => {
    const data = await request.formData();
    const categoryId = data.get("categoryId");
    await prisma.listCategory.update({
      where: { id: to_number(categoryId) },
      data: {
        name: data.get("name")?.toString(),
      },
    });
  },
};
