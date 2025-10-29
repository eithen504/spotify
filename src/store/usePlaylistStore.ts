import { create } from "zustand";

interface PlaylistData { 
  playlistId: string;
  activeTrackId: string;
  playImmediate: boolean
}

interface PlaylistStore {
  playlistData: PlaylistData;
  setPlaylistData: (data: Partial<PlaylistData>) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlistData: {
    playlistId: "",
    activeTrackId: "",
    playImmediate: false
  },
  setPlaylistData: (data) =>
    set((state) => ({
      playlistData: {
        ...state.playlistData,
        ...data,
      },
    })),
}));
