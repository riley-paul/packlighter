import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Item, ItemsLists, List, zItem, zList } from "./schema";

type Updater<T> = (id: string, data: Partial<T>) => void;
type Remover = (id: string) => void;

type State = ItemsLists;

const defaultState = {
  lists: [],
  items: [],
};

type Actions = {
  itemCreate: () => void;
  itemUpdate: Updater<Item>;

  listCreate: () => void;
  listUpdate: Updater<List>;
  listRemove: Remover;
};

const useAppStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...defaultState,

      itemCreate: () =>
        set((s) => {
          const newItem = zItem.parse({});
          s.items.push(newItem);
        }),
      itemUpdate: (id, data) =>
        set((s) => {
          const index = s.items.findIndex((i) => i.id === id);
          if (index === -1) return;
          s.items[index] = { ...s.items[index], ...data };
        }),

      listCreate: () =>
        set((s) => {
          const newList = zList.parse({});
          console.log(newList);
          s.lists.push(newList);
        }),
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
    })),
    { name: "app-storage" }
  )
);

export default useAppStore;
