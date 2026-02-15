import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GenreTitle, Playlist, Track, Visibility } from "../types";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useTrackDetailsStore } from "../store/useTrackDetailsStore";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useCheckAuth } from "./auth";
import { RECENT_PLAYLISTS_KEY } from "../constants";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetPlaylistTracks = (id: string) => {
    return useQuery({
        queryKey: ["getPlaylistTracks", id],
        queryFn: async () => {
            if (!id) return null;

            const res = await fetch(`${baseUrl}/api/v1/playlist/${id}`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });

            if (!res.ok) {
                return []
            }
            const data = await res.json()

            return data
        },
    })
}

const useGetFeedPlaylists = (page: number) => {
    return useQuery({
        queryKey: ["getFeedPlaylists", page],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/playlist/feed?page=${page}`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });

            if (!res.ok) {
                return []
            }
            const data = await res.json()

            return data
        },
    })
}

const useGetRecentPlaylists = () => {
    const { data: currentUser } = useCheckAuth();
    let playlistIds: string[] = JSON.parse(localStorage.getItem(RECENT_PLAYLISTS_KEY) || "[]");

    if (playlistIds.length > 10) {
        playlistIds = playlistIds.slice(0, 10);
        localStorage.setItem(RECENT_PLAYLISTS_KEY, JSON.stringify(playlistIds));
    }

    const params = new URLSearchParams();
    playlistIds.forEach(id => params.append("ids", id));

    return useQuery({
        queryKey: ["getRecentPlaylists"],
        queryFn: async () => {
            if (!currentUser) return [];
            
            const res = await fetch(`${baseUrl}/api/v1/playlist/recent?${params.toString()}`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });

            if (!res.ok) {
                return []
            }
            const data = await res.json()

            return data
        },
    })
}

const useGetGenrePlaylists = (id: string) => {
    return useQuery({
        queryKey: ["getGenrePlaylists", id],
        queryFn: async () => {
            if (!id) return null;

            const res = await fetch(`${baseUrl}/api/v1/playlist/${id}/genre`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });

            if (!res.ok) {
                return []
            }
            const data = await res.json()

            return data
        },
    })
}

const useUploadPlaylist = () => {
    const { data: currentUser } = useCheckAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: {
            title: string,
            coverImageUrl: string | null,
            genres: GenreTitle[],
            tracks: string[],
            visibility: Visibility
        }) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const res = await fetch(`${baseUrl}/api/v1/playlist`, {
                method: "POST", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }
            return data;
        },

        onSuccess: (playlist: Playlist) => {
            toast.success("Playlist uploaded successfully");
            queryClient.setQueryData(["getCurrentUserPlaylists"], (prev: Playlist[]) => {
                if (!prev) return prev;

                return [playlist, ...prev]
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useUpdatePlaylist = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data: currentUser } = useCheckAuth();

    return useMutation({
        mutationFn: async (payload: { title?: string, coverImageUrl?: string, tracks?: Track[] }) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const { title, coverImageUrl, tracks } = payload;
            const trackIds = tracks?.map((t) => t._id);

            const res = await fetch(`${baseUrl}/api/v1/playlist/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: {
                        title,
                        coverImageUrl,
                        trackIds
                    }
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return { updatedPlaylist: data, tracks };
        },

        onSuccess: ({ updatedPlaylist, tracks }: { updatedPlaylist: Playlist, tracks?: Track[] }) => {
            toast.success("Playlist updated successfully");

            queryClient.setQueryData(["getPlaylistTracks", id], (prev: any) => {
                if (!prev) return prev;

                return {
                    playlist: {
                        ...updatedPlaylist,
                        username: prev.playlist.username,
                        hasSaved: prev.playlist.hasSaved
                    },
                    tracks: tracks || prev.tracks,
                };
            });

            queryClient.setQueryData(["getCurrentUserPlaylists"], (prev: Playlist[]) => {
                if (!prev) return prev;

                return prev.map((p) => {
                    if (p._id == updatedPlaylist._id) return updatedPlaylist;
                    else return p;
                })
            })

            queryClient.setQueryData(["getCurrentUserSavePlaylists"], (prev: Playlist[]) => {
                if (!prev) return prev;

                return prev.map((p) => {
                    if (p._id == updatedPlaylist._id) return updatedPlaylist;
                    else return p;
                })
            })

        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useAddItemsToPlaylist = () => {
    const queryClient = useQueryClient();
    const { data: currentUser } = useCheckAuth();

    return useMutation({
        mutationFn: async (payload: { playlistId: string, tracks: Track[] }) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const { playlistId, tracks } = payload;
            const trackIds = tracks.map((t) => t._id);

            const res = await fetch(`${baseUrl}/api/v1/playlist/${playlistId}/items`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: { trackIds }
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return { updatedPlaylist: data, tracks };
        },

        onSuccess: ({ updatedPlaylist, tracks }: { updatedPlaylist: Playlist, tracks: Track[] }) => {
            toast.success(`Added To The Playlist ${updatedPlaylist.title} Successfully!`);

            queryClient.setQueryData(["getPlaylistTracks", updatedPlaylist._id], (prev: any) => {
                if (!prev) return prev;

                return {
                    playlist: updatedPlaylist,
                    tracks: [
                        ...prev.tracks,
                        ...tracks
                    ]
                }
            });

            queryClient.setQueryData(["getCurrentUserPlaylists"], (prev: Playlist[]) => {
                if (!prev) return prev;

                return prev.map((p) => {
                    if (p._id == updatedPlaylist._id) return updatedPlaylist;
                    else return p;
                })
            });

            queryClient.setQueryData(["getCurrentUserSavePlaylists"], (prev: Playlist[]) => {
                if (!prev) return prev;

                return prev.map((p) => {
                    if (p._id == updatedPlaylist._id) return updatedPlaylist;
                    else return p;
                })
            });
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const usePlaylistActions = () => {
    const navigate = useNavigate();
    const { setTrackDetails } = useTrackDetailsStore();
    const { playlistData: { playlistId }, setPlaylistData } = usePlaylistStore();

    const navigateToPlaylist = (navigateUrl: string) => {
        setPlaylistData({
            playImmediate: false
        })
        navigate(navigateUrl)
    }

    const handlePlayPausePlaylist = (
        isPlayingCurrentPlaylist: boolean,
        id: string,
        navigateUrl: string
    ) => {
        const isPlaylistInitialized = playlistId == id;

        if (!isPlaylistInitialized) {
            setPlaylistData({
                playImmediate: true
            })

            navigate(navigateUrl)
            return;
        }

        if (isPlayingCurrentPlaylist) {
            setTrackDetails({ isPlaying: false })
        } else {
            setTrackDetails({ isPlaying: true })
        }
    }

    return {
        navigateToPlaylist,
        handlePlayPausePlaylist
    }
}

export {
    useGetPlaylistTracks,
    useGetFeedPlaylists,
    useGetRecentPlaylists,
    useGetGenrePlaylists,
    useUploadPlaylist,
    useUpdatePlaylist,
    useAddItemsToPlaylist,
    usePlaylistActions
}