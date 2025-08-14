import { create } from "zustand";

interface ScrollStore {
  isScrolled: boolean;
  isScrollExceeded: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  setIsScrollExceeded: (exceeded: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrolled: false,
  isScrollExceeded: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setIsScrollExceeded: (exceeded) => set({ isScrollExceeded: exceeded }),
}));
