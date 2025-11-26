import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTrackDetailsStore } from "../store/useTrackDetailsStore";
import { useAlbumStore } from "../store/useAlbumStore";
import { useCheckAuth } from "./auth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetAlbumTracks = (id: string) => {
    return useQuery({
        queryKey: ["getAlbumTracks", id],
        queryFn: async () => {
            if (!id) return null;

            const res = await fetch(`${baseUrl}/api/v1/album/${id}`, {
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

const useUploadAlbum = () => {
    const { data: currentUser } = useCheckAuth();

    return useMutation({
        mutationFn: async (payload: { title: string, coverImageUrl: string | null }) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const res = await fetch(`${baseUrl}/api/v1/album`, {
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

        onSuccess: () => {
            toast.success("Album uploaded successfully")
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useUpdateAlbum = (id: string) => {
    const { data: currentUser } = useCheckAuth();

    return useMutation({
        mutationFn: async (payload: { title: string, coverImageUrl: string }) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const res = await fetch(`${baseUrl}/api/v1/album/${id}`, {
                method: "PATCH",
                credentials: "include",
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

        onSuccess: () => {
            toast.success("Album updated successfully")
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useAlbumActions = () => {
    const navigate = useNavigate();
    const { setTrackDetails } = useTrackDetailsStore();
    const { albumData: { albumId }, setAlbumData } = useAlbumStore();

    const navigateToAlbum = (navigateUrl: string) => {
        setAlbumData({
            playImmediate: false
        })
        navigate(navigateUrl)
    }

    const handlePlayPauseAlbum = (isPlayingCurrentAlbum: boolean, id: string, navigateUrl: string) => {
        const isAlbumInitialized = albumId == id

        if (!isAlbumInitialized) {
            setTimeout(() => {
                setAlbumData({ playImmediate: true });
            }, 100)

            navigate(navigateUrl);
            return;
        }

        if (isPlayingCurrentAlbum) {
            setTimeout(() => {
                setTrackDetails({ isPlaying: false });
            }, 100)
        } else {
            setTimeout(() => {
                setTrackDetails({ isPlaying: true });
            }, 100)
        }
    }

    return {
        navigateToAlbum,
        handlePlayPauseAlbum
    }
}

export {
    useGetAlbumTracks,
    useUploadAlbum,
    useUpdateAlbum,
    useAlbumActions,
}