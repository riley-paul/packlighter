import { to_number } from "svelte/internal";
import prisma from "../../lib/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  createList: async ({ request }) => {
    const data = await request.formData();
    const newList = await prisma.list.create({ data: { userId: 1 } });
    throw redirect(303, `/${newList.id}`);
  },
  deleteList: async ({ request }) => {
    const data = await request.formData();
    const listId = data.get("itemId");
    await prisma.list.delete({ where: { id: to_number(listId) } });
  },
};
