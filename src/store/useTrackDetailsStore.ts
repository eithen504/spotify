import { create } from "zustand";
import type { Track } from "../types";

type Details = Track & {
    isPlaying: boolean;
};

interface TrackDetailsStore {
    trackDetails: Details;
    setTrackDetails: (details: Partial<Details>) => void;
}

export const useTrackDetailsStore = create<TrackDetailsStore>((set) => ({
    trackDetails: {
        _id: "",
        title: "",
        coverImageUrl: "",
        audioUrl: "",
        artist: "",
        duration: 0,
        genre: [],
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
