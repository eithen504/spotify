import { create } from 'zustand'

interface CountState {
  count: number
  setCount: (value: number) => void
  increment: () => void
  decrement: () => void
}

export const useCountStore = create<CountState>((set) => ({
  count: 0,
  setCount: (value) => set({ count: value }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
