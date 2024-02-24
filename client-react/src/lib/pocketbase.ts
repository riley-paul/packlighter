import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

const pbUrl = process.env.PB_TYPEGEN_URL;
export const pb = new PocketBase(pbUrl) as TypedPocketBase;
