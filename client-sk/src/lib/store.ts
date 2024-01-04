import { writable } from "svelte/store";

export const currentList = writable<string | null>(null);
export const isForeignItem = writable<boolean>(false);
