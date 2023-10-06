import { create } from "zustand";
import {
  createList,
  type CategoryType,
  type ItemType,
  type ListIemType,
  type UserDataType,
  type ListType,
} from "./schema";

type UserDataStore = UserDataType & {
  updateItem: (itemId: string, data: Partial<ItemType>) => void;
  updateListItem: (id: string, data: Partial<ListIemType>) => void;
  updateCategory: (id: string, data: Partial<CategoryType>) => void;
  updateList: (id: string, data: Partial<ListType>) => void;
};

const useUserDataStore = create<UserDataStore>((set) => ({
  items: [],
  lists: [createList()],
  updateItem: (id, data) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    })),
  updateListItem: (id, data) => {},
  updateCategory: (id, data) => {},
  updateList: (id, data) => {},
}));
