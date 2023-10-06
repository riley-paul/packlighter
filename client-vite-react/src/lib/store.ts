import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import {
  AppDataType,
  CategoryType,
  ItemType,
  // ListIemType,
  ListType,
  initAppData,
  initCategory,
  initItem,
  initList,
} from "./schema";

type Actions = {
  addItem: (item?: Partial<ItemType>) => ItemType;
  updateItem: (id: string, item: Partial<ItemType>) => void;
  getItem: (id: string) => ItemType | undefined;
  removeItem: (id: string) => void;
  addList: (list?: Partial<ListType>) => ListType;
  updateList: (id: string, list: Partial<ListType>) => void;
  getList: (id: string) => ListType | undefined;
  removeList: (id: string) => void;
  setLists: (lists: ListType[]) => void;
  addCategory: (
    listId: string,
    category?: Partial<CategoryType>
  ) => CategoryType;
  removeCategory: (listId: string, id: string) => void;
  updateCategory: (
    listId: string,
    id: string,
    category: Partial<CategoryType>
  ) => void;
  setCategories: (listId: string, categories: CategoryType[]) => void;
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
        const newItem = initItem(item);
        set((state) => {
          state.items.push(newItem);
        });
        return newItem;
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
        const newList = initList(list);
        set((state) => {
          state.lists.push(newList);
        });
        return newList;
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
      setLists: (lists) => {
        set((state) => {
          state.lists = lists;
        });
      },
      addCategory: (listId, category) => {
        const newCategory = initCategory(category);
        set((state) => {
          const listIndex = state.lists.findIndex((list) => list.id === listId);
          state.lists[listIndex].categories.push(newCategory);
        });
        return newCategory;
      },
      removeCategory: (listId, id) => {
        set((state) => {
          const listIndex = state.lists.findIndex((list) => list.id === listId);
          const prev = state.lists[listIndex].categories;
          state.lists[listIndex].categories = prev.filter(
            (category) => category.id !== id
          );
        });
      },
      updateCategory: (listId, id, category) => {
        set((state) => {
          const listIndex = state.lists.findIndex((list) => list.id === listId);
          const categoryIndex = state.lists[listIndex].categories.findIndex(
            (category) => category.id === id
          );
          Object.assign(
            state.lists[listIndex].categories[categoryIndex],
            category
          );
        });
      },
      setCategories(listId, categories) {
        set((state) => {
          const listIndex = state.lists.findIndex((list) => list.id === listId);
          state.lists[listIndex].categories = categories;
        });
      },
    })),
    { name: "packlighter-app-data" }
  )
);
