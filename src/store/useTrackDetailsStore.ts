import { create } from "zustand";

interface Details {
    _id: string;
    title: string;
    coverImageUrl: string;
    audioUrl: string;
    artist: string;
    duration: string;
    albumId: string | null;
    albumName: string;
    hasLiked: boolean;
    isPlaying: boolean;
}

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
        duration: "",
        albumId: "",
        albumName: "",
        hasLiked: false,
        isPlaying: false
    },
    setTrackDetails: (details) => 
        set((state) => ({ 
            trackDetails: { ...state.trackDetails, ...details } 
        }))
}));
