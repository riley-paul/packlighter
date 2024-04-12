import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  Category,
  CategoryItem,
  Item,
  ItemsLists,
  List,
  zCategory,
  zCategoryItem,
  zItem,
  zList,
} from "./schema";

type CreatorParent<T> = (parentId: string, data?: Partial<T>) => T;
type Creator<T> = (data?: Partial<T>) => T;
type Getter<T> = (id: string) => T | undefined;
type Updater<T> = (id: string, data: Partial<T>) => void;
type Remover = (id: string) => void;
type Reorderer<T> = (entities: T[]) => void;
type ReordererParent<T> = (parentId: string, entities: T[]) => void;
type TogglePacked = (id: string, packed?: boolean) => void;

type State = ItemsLists;

const defaultState = {
  lists: [],
  items: [],
};

type Actions = {
  itemGet: Getter<Item>;
  itemCreate: Creator<Item>;
  itemUpdate: Updater<Item>;
  itemRemove: Remover;

  listGet: Getter<List>;
  listCreate: Creator<List>;
  listUpdate: Updater<List>;
  listRemove: Remover;
  listReorder: Reorderer<List>;

  categoryCreate: CreatorParent<Category>;
  categoryUpdate: Updater<Category>;
  categoryRemove: Remover;
  categoryTogglePacked: TogglePacked;
  categoryReorder: ReordererParent<Category>;

  categoryItemCreate: CreatorParent<CategoryItem>;
  categoryItemUpdate: Updater<CategoryItem>;
  categoryItemRemove: Remover;
};

const useAppStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      ...defaultState,

      itemGet: (id) => {
        return get().items.find((i) => i.id === id);
      },

      itemCreate: (data) => {
        const newItem = zItem.parse({ ...data });
        set((s) => {
          s.items.push(newItem);
        });
        return newItem;
      },

      itemUpdate: (id, data) =>
        set((s) => {
          const index = s.items.findIndex((i) => i.id === id);
          if (index === -1) return;
          s.items[index] = { ...s.items[index], ...data };
        }),

      itemRemove: (id) =>
        set((s) => {
          s.items = s.items.filter((i) => i.id !== id);
          // remove related category items
          s.lists.forEach((l) => {
            l.categories.forEach((c) => {
              c.items = c.items.filter((i) => i.itemId !== id);
            });
          });
        }),

      listGet: (id) => {
        return get().lists.find((l) => l.id === id);
      },

      listCreate: (data) => {
        const newList = zList.parse({ ...data });
        set((s) => {
          s.lists.push(newList);
        });
        return newList;
      },

      listUpdate: (id, data) =>
        set((s) => {
          const index = s.lists.findIndex((l) => l.id === id);
          if (index === -1) return;
          s.lists[index] = { ...s.lists[index], ...data };
        }),

      listRemove: (id) =>
        set((s) => {
          s.lists = s.lists.filter((l) => l.id !== id);
        }),

      listReorder: (lists) =>
        set((s) => {
          s.lists = lists;
        }),

      categoryCreate: (listId, data) => {
        const newCategory = zCategory.parse({ ...data });
        set((s) => {
          const list = s.lists.find((l) => l.id === listId);
          if (!list) return;
          list.categories.push(newCategory);
        });
        return newCategory;
      },

      categoryUpdate: (id, data) =>
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.id === id)
          );
          if (!list) return;
          const index = list.categories.findIndex((c) => c.id === id);
          if (index === -1) return;
          list.categories[index] = { ...list.categories[index], ...data };
        }),

      categoryRemove: (id) =>
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.id === id)
          );
          if (!list) return;
          list.categories = list.categories.filter((c) => c.id !== id);
        }),

      categoryTogglePacked: (id, packed) =>
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.id === id)
          );
          if (!list) return;
          const category = list.categories.find((c) => c.id === id);
          if (!category) return;
          const fullyPacked = category.items.every((i) => i.packed);
          category.items = category.items.map((i) => ({
            ...i,
            packed: packed ?? !fullyPacked,
          }));
        }),

      categoryReorder: (listId, categories) =>
        set((s) => {
          const list = s.lists.find((l) => l.id == listId);
          if (!list) return;
          list.categories = categories;
        }),

      categoryItemCreate: (categoryId, data) => {
        const newCategoryItem = zCategoryItem.parse({ ...data });
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.id === categoryId)
          );
          if (!list) return;
          const category = list.categories.find((c) => c.id === categoryId);
          if (!category) return;
          category.items.push(newCategoryItem);
        });
        return newCategoryItem;
      },

      categoryItemUpdate: (id, data) =>
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.items.some((i) => i.id === id))
          );
          if (!list) return;
          const category = list.categories.find((c) =>
            c.items.some((i) => i.id === id)
          );
          if (!category) return;
          const index = category.items.findIndex((i) => i.id === id);
          if (index === -1) return;
          category.items[index] = { ...category.items[index], ...data };
        }),

      categoryItemRemove: (id) =>
        set((s) => {
          const list = s.lists.find((l) =>
            l.categories.some((c) => c.items.some((i) => i.id === id))
          );
          if (!list) return;
          const category = list.categories.find((c) =>
            c.items.some((i) => i.id === id)
          );
          if (!category) return;
          category.items = category.items.filter((i) => i.id !== id);
        }),
    })),
    { name: "app-storage" }
  )
);

export default useAppStore;
