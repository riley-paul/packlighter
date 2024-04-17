import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPaths = {
  list: (listId: string) => `/lists/${listId}`,
  gear: () => "/gear",
  home: () => "/",
  auth: () => "/auth",
};