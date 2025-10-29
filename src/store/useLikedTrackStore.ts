import { create } from "zustand";
import type { Track } from "../types";

interface LikedTracksStore {
  likedTracks: Record<string, Track>;
  unLikedTracks: Record<string, boolean>;
  addLikedTrack: (track: Track) => void;
  removeLikedTrack: (trackId: string) => void;
}

export const useLikedTracksStore = create<LikedTracksStore>((set) => ({
  likedTracks: {},
  unLikedTracks: {},

  addLikedTrack: (track) =>
    set((state) => {
      const updatedUnliked = { ...state.unLikedTracks };
      delete updatedUnliked[track._id];

      return {
        likedTracks: {
          ...state.likedTracks,
          [track._id]: track,
        },
        unLikedTracks: updatedUnliked,
      };
    }),

  removeLikedTrack: (trackId) =>
    set((state) => {
      const updatedLiked = { ...state.likedTracks };
      delete updatedLiked[trackId];

      return {
        likedTracks: updatedLiked,
        unLikedTracks: {
          ...state.unLikedTracks,
          [trackId]: true,
        },
      };
    }),
}));
