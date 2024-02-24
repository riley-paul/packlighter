import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

export const pb = new PocketBase(
  "https:packlighter.rileypaul.ca"
) as TypedPocketBase;
