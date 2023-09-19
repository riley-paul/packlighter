import { create } from "zustand";
import type PocketBase from "pocketbase";
import { v4 as uuid } from "uuid";

interface Item {
  id: string;
  name?: string;
  description?: string;
  weight_g?: number;
  cost?: number;
  link?: string;
  image_url?: string;
}

interface CategoryItem {
  itemId: string;
  quantity: number;
  isWorn: boolean;
  isConsumable: boolean;
}

interface Category {
  id: string;
  name?: string;
  items: CategoryItem[];
}

interface List {
  id: string;
  name?: string;
  description?: string;
  categories: Category[];
}

interface State {
  user: PocketBase["authStore"]["model"] | undefined;
  items: Item[];
  lists: List[];
}

const useStore = create<State>((set) => ({
  user: undefined,
  setUser: (user: PocketBase["authStore"]["model"]) =>
    set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: undefined })),
  items: [],
  createItem: (data: Partial<Item>) =>
    set((prev) => ({
      ...prev,
      items: [...prev.items, { id: uuid(), ...data }],
    })),
  deleteItem: (itemId: string) =>
    set((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== itemId),
    })),
  updateItem: (itemId: string, data: Partial<Item>) =>
    set((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)),
    })),
  lists: [],
  createList: (data: Partial<List>) =>
    set((prev) => ({
      ...prev,
      lists: [
        ...prev.lists,
        { id: uuid(), categories: [{ id: uuid(), items: [] }], ...data },
      ],
    })),
  updateList: (itemId: string, data: Partial<List>) =>
    set((prev) => ({
      ...prev,
      lists: prev.lists.map((i) => (i.id === itemId ? { ...data, ...i } : i)),
    })),
  deleteList: (itemId: string) =>
    set((prev) => ({
      ...prev,
      lists: prev.lists.filter((i) => i.id !== itemId),
    })),
  createCategory: () => {},
  deleteCategory: () => {},
  updateCategory: () => {},
}));

export default useStore;
