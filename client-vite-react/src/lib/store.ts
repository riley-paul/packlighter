import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {
  AppDataType,
  // CategoryType,
  ItemType,
  // ListIemType,
  ListType,
  initAppData,
  initItem,
  initList,
} from "./schema";

type Actions = {
  addItem: (item?: Partial<ItemType>) => void;
  updateItem: (id: string, item: Partial<ItemType>) => void;
  getItem: (id: string) => ItemType | undefined;
  removeItem: (id: string) => void;
  addList: (list: Partial<ListType>) => void;
  updateList: (id: string, list: Partial<ListType>) => void;
  getList: (id: string) => ListType | undefined;
  removeList: (id: string) => void;
  // addCategory: (listId: string, category: CategoryType) => void;
  // removeCategory: (listId: string, id: string) => void;
  // updateCategory: (listId: string, category: CategoryType) => void;
  // addListItem: (listId: string, categoryId: string, item: ListIemType) => void;
  // removeListItem: (listId: string, categoryId: string, id: string) => void;
  // updateListItem: (
  //   listId: string,
  //   categoryId: string,
  //   item: ListIemType
  // ) => void;
};

type State = AppDataType & Actions;

export const useAppStore = create<State>()(
  persist(
    immer((set, get) => ({
      ...initAppData(),
      addItem: (item) => {
        set((state) => {
          state.items.push(initItem(item));
        });
      },
      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id);
        });
      },
      updateItem: (id, item) => {
        set((state) => {
          const index = state.items.findIndex((i) => i.id === id);
          Object.assign(state.items[index], item);
        });
      },
      getItem: (id) => {
        return get().items.find((item) => item.id === id);
      },
      addList: (list) => {
        set((state) => {
          state.lists.push(initList(list));
        });
      },
      removeList: (id) => {
        set((state) => {
          state.lists = state.lists.filter((list) => list.id !== id);
        });
      },
      updateList: (id, list) => {
        set((state) => {
          const index = state.lists.findIndex((i) => i.id === id);
          Object.assign(state.lists[index], list);
        });
      },
      getList: (id) => {
        return get().lists.find((list) => list.id === id);
      },
    })),
    { name: "packlighter-app-data" }
  )
);
