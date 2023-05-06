import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "$lib/prisma";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
});
