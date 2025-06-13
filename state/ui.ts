import { create } from "zustand";

interface UIState {
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  headerHeight: 0,
  setHeaderHeight: (height: number) =>
    set((prev) => {
      if (prev.headerHeight === height) return prev;
      return { headerHeight: height };
    }),
}));
