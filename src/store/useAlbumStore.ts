import { create } from "zustand";

interface AlbumData { 
  activeTrackId: string;
  albumId: string;
  playImmediate: boolean
}

interface AlbumStore {
  albumData: AlbumData;
  setAlbumData: (data: Partial<AlbumData>) => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  albumData: {
    activeTrackId: "",
    albumId: "",
    playImmediate: false
  },
  setAlbumData: (data) =>
    set((state) => ({
      albumData: {
        ...state.albumData,
        ...data,
      },
    })),
}));
