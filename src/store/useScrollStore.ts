import { create } from "zustand";

interface ScrollStore {
  isScrolled: boolean;
  scrollFromTop: number;
  shouldHideScroll: boolean;
  setIsScrolled: (scrolled: boolean) => void;
  setScrollFromTop: (value: number) => void;
  setShouldHideScroll: (shouldHide: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrolled: false,
  scrollFromTop: 0,
  shouldHideScroll: false,
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setScrollFromTop: (value) => set({ scrollFromTop: value }),
  setShouldHideScroll: (shouldHide) => set({ shouldHideScroll: shouldHide }),
}));
