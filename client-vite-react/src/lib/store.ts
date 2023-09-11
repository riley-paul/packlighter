import { create } from "zustand";
import type PocketBase from "pocketbase";

interface State {
  user: PocketBase["authStore"]["model"] | undefined;
}

const useStore = create<State>((set) => ({
  user: undefined,
  setUser: (user: PocketBase["authStore"]["model"]) =>
    set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: undefined })),
}));

export default useStore;
