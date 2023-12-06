import type { ExpandedCategory } from "@/hooks/useList";

export const isCategoryFullyPacked = (category: ExpandedCategory) =>
  category.items.length > 0 && category.items.every((i) => i.packed);
