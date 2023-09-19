import PocketBase, { Record } from "pocketbase";
import { useState } from "react";

export interface ListItems {
  [string]
}

export default function useList(pb: PocketBase, initialList: Record) {
  const [list, setList] = useState(initialList);

  return { list };
}
