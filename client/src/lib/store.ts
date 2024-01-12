import { writable } from "svelte/store";

export const isForeignItem = writable<boolean>(false);
export const isSidebarOpen = writable<boolean>(true);