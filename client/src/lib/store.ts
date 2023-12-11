import { writable } from "svelte/store";

export const currentList = writable<string | null>(null);
