import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const GET: RequestHandler = async ({locals}) => {
  try {
    const data = await locals.pb.collection("lists").getFullList();
    return json(data);
  } catch (err) {
    const pbError = err as ClientResponseError;
    console.error(pbError);
    throw error(pbError.response.code, pbError.response.message);
  }
};

export const POST: RequestHandler = async ({locals, request}) => {
  const data = await request.json()
  
  try {
    const created = await locals.pb.collection("lists").create({data});
    return json(created);
  } catch (err) {
    const pbError = err as ClientResponseError;
    console.error(pbError);
    throw error(pbError.response.code, pbError.response.message);
  }
};