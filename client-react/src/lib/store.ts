import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Store {
  isSidebarOpen: boolean;
  toggleSidebar: (open?: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: (open) =>
        set((state) => ({
          isSidebarOpen: open !== undefined ? open : !state.isSidebarOpen,
        })),
    }),
    { name: "packlighter-store" }
  )
);
