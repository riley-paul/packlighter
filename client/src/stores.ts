import { writable } from "svelte/store";
import { Record } from "pocketbase";

export const currentList: any = writable({});
