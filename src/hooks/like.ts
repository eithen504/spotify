import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLikedTracksStore } from "../store/useLikedTrackStore";
import type { Track } from "../types";
import { useCheckAuth } from "./auth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetLikedTracks = () => {
    return useQuery({
        queryKey: ["getLikedTracks"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/like`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });

            if (!res.ok) {
                return null
            }
            const data = await res.json()

            return data
        },
    })
}

interface GetLikeStatusParams {
    hasLiked: boolean;
    trackId: string;
}

const useTrackLikeStatus = () => {
    const { likedTracks, unLikedTracks } = useLikedTracksStore();

    const getTrackLikeStatus = ({ hasLiked, trackId }: GetLikeStatusParams): boolean => {
        if (hasLiked) {
            if (unLikedTracks[trackId]) return false;
            return true;
        }

        if (!hasLiked) {
            if (likedTracks[trackId]) return true;
            return false;
        }

        return false;
    };

    return { getTrackLikeStatus };
};

const useLikeTrack = () => {
    const { addLikedTrack, removeLikedTrack } = useLikedTracksStore();
    const { data: currentUser } = useCheckAuth();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (track: Track) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const res = await fetch(`${baseUrl}/api/v1/like/${track._id}`, {
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

            return { track, isLiked: data.isLiked };
        },

        onSuccess: ({ track, isLiked }) => {
            if (isLiked) {
                toast.success(`Added To Liked Tracks`)
                addLikedTrack(track)

                queryClient.setQueryData(['getLikedTracks'], (prev: Track[]) => {
                    if (!prev) return prev;

                    return [
                        ...prev,
                        {
                            ...track,
                            hasLiked: true
                        }
                    ]
                })
            }
            else {
                toast.success("Remove From Liked Tracks")
                removeLikedTrack(track._id)

                queryClient.setQueryData(['getLikedTracks'], (prev: Track[]) => {
                    if (!prev) return prev;

                    return prev.filter((t) => t._id != track._id);
                })
            }
        },

        // chech which one is active playlist or album
        // if(playlist) then find it and toogle
        // if(album) then find it and toogle
        // then if we return back to album this will still show you false
        // this approach failed here

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export {
    useGetLikedTracks,
    useTrackLikeStatus,
    useLikeTrack
}