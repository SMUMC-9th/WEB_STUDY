import { create } from "zustand";

type TabType = "list" | "summary";

interface CartTabsState {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

export const useCartTabsStore = create<CartTabsState>((set) => ({
  tab: "list",
  setTab: (tab) => set({ tab }),
}));
