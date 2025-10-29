import { create } from "zustand";

interface RepeatTrackStore {
  repeatTracks: Record<string, boolean>;
  addToRepeatTracks: (id: string) => void;
  removeFromRepeatTrack: (id: string) => void;
}

export const useRepeatTrackStore = create<RepeatTrackStore>((set) => ({
  repeatTracks: {},
  addToRepeatTracks: (id) => {
    set((state) => ({
      repeatTracks: {
        ...state.repeatTracks,
        [id]: true,
      },
    }));
  },
  removeFromRepeatTrack: (id) => {
    set((state) => {
      const { [id]: _, ...rest } = state.repeatTracks;
      return { repeatTracks: rest };
    });
  },
}));

