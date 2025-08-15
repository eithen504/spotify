import { create } from "zustand";

interface ScrollStore {
  isScrolled: boolean;
  scrollFromTop: number;
  setIsScrolled: (scrolled: boolean) => void;
  setScrollFromTop: (value: number) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrolled: false,
  scrollFromTop: 0,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setScrollFromTop: (value) => set({ scrollFromTop: value }),
}));
