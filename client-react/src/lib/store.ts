import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    { name: "packlighter-store" }
  )
);
