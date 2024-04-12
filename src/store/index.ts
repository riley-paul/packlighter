import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Item, ItemsLists, List, zItem, zList } from "./schema";

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

  listCreate: () => List;
  listUpdate: Updater<List>;
  listRemove: Remover;
  listReorder: Reorderer<List>;
};

const useAppStore = create<State & Actions>()(
  persist(
    immer((set) => ({
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
    })),
    { name: "app-storage" }
  )
);

export default useAppStore;
