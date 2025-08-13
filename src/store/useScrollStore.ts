import { create } from "zustand";

interface ScrollStore {
  isScrolled: boolean;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrolled: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled })
}));
