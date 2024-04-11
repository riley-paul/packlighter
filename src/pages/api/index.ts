import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  return new Response(
    JSON.stringify({
      name: "PackLighter API",
      version: "v1",
      description: "Packing list API",
      documentation_url: "https://your-api-documentation.com",
      status: "OK",
    })
  );
};
