import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPaths = {
  list: (listId: string) => `/packlighter/list/${listId}`,
  gear: () => "/packlighter/gear",
  home: () => "/packlighter",
  auth: () => "/packlighter/auth",
};
