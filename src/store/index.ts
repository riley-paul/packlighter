import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Item, ItemsLists, List, zItem, zList } from "./schema";

type Updater<T> = (id: string, data: Partial<T>) => void;

type State = ItemsLists;

const defaultState = {
  lists: [],
  items: [],
};

type Actions = {
  itemActions: {
    create: () => void;
    update: Updater<Item>;
  };
  listActions: {
    create: () => void;
    update: Updater<List>;
  };
};

const useAppStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...defaultState,
      itemActions: {
        create: () =>
          set((s) => {
            const newItem = zItem.parse({});
            s.items.push(newItem);
          }),
        update: (id, data) =>
          set((s) => {
            const index = s.items.findIndex((i) => i.id === id);
            if (index === -1) return;
            s.items[index] = { ...s.items[index], ...data };
          }),
      },
      listActions: {
        create: () =>
          set((s) => {
            const newList = zList.parse({});
            s.lists.push(newList);
          }),
        update: (id, data) =>
          set((s) => {
            const index = s.lists.findIndex((l) => l.id === id);
            if (index === -1) return;
            s.lists[index] = { ...s.lists[index], ...data };
          }),
      },
    })),
    { name: "app-storage" }
  )
);

export default useAppStore;
