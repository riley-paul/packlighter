import { test, expect } from "vitest";
import { zCategory, zCategoryItem, zItem, zList } from "./schema";

test("Parse empty Item", () => {
  const parsed = zItem.safeParse({});
  expect(parsed.success).toBe(true);
});

test("Parse empty category item", () => {
  const parsed = zCategoryItem.safeParse({});
  expect(parsed.success).toBe(true);
});

test("Parse empty category", () => {
  const parsed = zCategory.safeParse({});
  expect(parsed.success).toBe(true);
});

test("Parse empty List", () => {
  const parsed = zList.safeParse({});
  expect(parsed.success).toBe(true);
});
