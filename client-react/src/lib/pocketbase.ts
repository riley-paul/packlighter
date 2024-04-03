import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

export const pb = new PocketBase(
  "https://sandbox.rileypaul.ca/packlighter"
) as TypedPocketBase;
