import prisma from "$lib/prisma";
import { to_number } from "svelte/internal";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const list = await prisma.list.findUnique({
    where: { id: to_number(params.id) },
    include: { categories: true },
  });
  return { list };
};
