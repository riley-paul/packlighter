import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  Category,
  Item,
  ItemsLists,
  List,
  zCategory,
  zItem,
  zList,
} from "./schema";

type Updater<T> = (id: string, data: Partial<T>) => void;
type Remover = (id: string) => void;
type Reorderer<T> = (entities: T[]) => void;

type State = ItemsLists;

const defaultState = {
  lists: [],
  items: [],
};

type Actions = {
  itemCreate: () => Item;
  itemUpdate: Updater<Item>;

  listGet: (id: string) => List | undefined;
  listCreate: () => List;
  listUpdate: Updater<List>;
  listRemove: Remover;
  listReorder: Reorderer<List>;

  categoryCreate: (listId: string) => Category;
  categoryUpdate: Updater<Category>;
  categoryRemove: Remover;
};

const useAppStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      ...defaultState,

      itemCreate: () => {
        const newItem = zItem.parse({});
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

      listGet: (id) => {
        return get().lists.find((l) => l.id === id);
      },
      listCreate: () => {
        const newList = zList.parse({});
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

      categoryCreate: (listId) => {
        const newCategory = zCategory.parse({});
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
    })),
    { name: "app-storage" }
  )
);

export default useAppStore;
