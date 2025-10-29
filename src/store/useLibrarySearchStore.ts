import { create } from "zustand";

interface LibrarySearchStore {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const useLibrarySearchStore = create<LibrarySearchStore>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
