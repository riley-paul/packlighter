import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types";

const pb = new PocketBase(
  "https://packlighter.rileypaul.ca"
) as TypedPocketBase;

export default pb;
