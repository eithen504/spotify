import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Playlist } from "../types";
import { useCheckAuth } from "./auth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useSavePlaylist = () => {
    const queryClient = useQueryClient();
    const {data: currentUser} = useCheckAuth();

    return useMutation({
        mutationFn: async (playlist: Playlist) => {
            if(!currentUser) throw new Error("Authentication required. Please log in or create an account to save this playlist.");

            const res = await fetch(`${baseUrl}/api/v1/savePlaylist/${playlist._id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return { playlist, isSaved: data.isSaved };
        },
        
        onSuccess: ({ playlist, isSaved }) => {
            if (isSaved) {
                queryClient.setQueryData(
                    ["getCurrentUserSavePlaylists"],
                    (prev: Playlist[]) => {
                        if (!prev) return prev;

                        return [
                            ...prev,
                            {
                                _id: playlist._id,
                                title: playlist.title,
                                coverImageUrl: playlist.coverImageUrl,
                                userId: playlist.userId,
                                username: "",
                                genre: playlist.genre,
                                tracks: playlist.tracks,
                                hasSaved: false,
                                createdAt: playlist.createdAt,
                                updatedAt: playlist.updatedAt
                            }
                        ]
                    }
                )
                toast.success("Added To Save Playlist")
            }
            else {
                queryClient.setQueryData(
                    ["getCurrentUserSavePlaylists"],
                    (prev: Playlist[]) => {
                        if (!prev) return prev;

                        return prev.filter((p) => p._id != playlist._id)
                    }
                )
                toast.success("Remove From Save Playlist")
            }

            queryClient.setQueryData(
                ["getPlaylistTracks", playlist._id],
                (prev: any) => {
                    if (!prev) return prev; // safety check in case cache is empty

                    return {
                        ...prev,
                        playlist: {
                            ...prev.playlist,
                            hasSaved: !prev.playlist.hasSaved, // or true / a variable if needed
                        },
                    };
                }
            );
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export {
    useSavePlaylist
}