import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

const pbUrl = import.meta.env.PB_TYPEGEN_URL;
export const pb = new PocketBase(pbUrl) as TypedPocketBase;
