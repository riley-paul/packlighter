import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  isSidebarOpen: boolean;
}

const defaultState: State = {
  isSidebarOpen: false,
};

interface Actions {
  toggleSidebar: (open?: boolean) => void;
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...defaultState,
      toggleSidebar: (open) =>
        set((state) => ({
          isSidebarOpen: open ?? !state.isSidebarOpen,
        })),
    }),
    { name: "packlighter-store" }
  )
);
