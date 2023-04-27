import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const listsResponse = await fetch("/api/list");
  const lists = await listsResponse.json();

  const gearResponse = await fetch("/api/gear");
  const gear = await gearResponse.json();

  return { lists, gear };
};
