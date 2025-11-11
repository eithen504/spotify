import { create } from "zustand";
import type { TrackDetails } from "../types";

interface TrackDetailsStore {
    trackDetails: TrackDetails;
    setTrackDetails: (details: Partial<TrackDetails>) => void;
}

export const useTrackDetailsStore = create<TrackDetailsStore>((set) => ({
    trackDetails: {
        _id: "",
        title: "",
        coverImageUrl: "",
        audioUrl: "",
        artist: "",
        duration: 0,
        genres: [],
        albumId: null,
        albumName: "",
        language: "English",
        hasLiked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPlaying: false
    },
    setTrackDetails: (details) =>
        set((state) => ({
            trackDetails: { ...state.trackDetails, ...details }
        }))
}));
