import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { type Genres, type Language, type Track } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetSuggestedTracks = (id: string) => {
    return useQuery<Track[]>({
        queryKey: ["suggestedTracks", id],
        queryFn: async () => {

            const res = await fetch(`${baseUrl}/api/v1/track/suggested/${id}`, {
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

const useGetTrack = (id: string) => {
    return useQuery<Track>({
        queryKey: ["getTrack", id],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/track/${id}`, {
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

const useUploadTrack = () => {
    return useMutation({
        mutationFn: async (payload: {
            title: string,
            coverImageUrl: string,
            audioUrl: string,
            artist: string,
            duration: number,
            genres: Genres,
            albumId: string | null,
            language: Language
        }) => {
            const res = await fetch(`${baseUrl}/api/v1/track`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload
                }),
            });
            console.log(res, "res");

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return data;
        },

        onSuccess: () => {
            toast.success("Track uploaded successfully")
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useUpdateTrack = (id: string) => {
    return useMutation({
        mutationFn: async (payload: { title: string, coverImageUrl: string }) => {
            const res = await fetch(`${baseUrl}/api/v1/track/${id}`, {
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
            toast.success("Track updated successfully")
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export {
    useGetSuggestedTracks,
    useGetTrack,
    useUploadTrack,
    useUpdateTrack
}