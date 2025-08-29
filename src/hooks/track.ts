import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { GenreTitle } from "../Types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetTrack = (id: string) => {
    return useQuery({
        queryKey: ["getTrack", id],
        queryFn: async () => {

            const res = await fetch(`${baseUrl}/api/v1/track/getTrack/${id}`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });


            if (res.status != 200) {
                return null
            }
            const data = await res.json()

            console.log("data", data);

            return data
        },
    })
}

const useGetSuggestedTracks = () => {
    return useQuery({
        queryKey: ["suggestedTracks"],
        queryFn: async () => {

            const res = await fetch(`${baseUrl}/api/v1/track/getSuggestedTracks`, {
                method: "GET", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
            });


            if (res.status != 200) {
                return null
            }
            const data = await res.json()

            return data
        },
    })
}

const useUploadTrack = () => {
    return useMutation({
        mutationFn: async (payload: { title: string, coverImageUrl: string, audioUrl: string, artist: string, duration: string, genre: GenreTitle[], albumId: string | null }) => {
            const res = await fetch(`${baseUrl}/api/v1/track/uploadTrack`, {
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

export {
    useGetTrack,
    useGetSuggestedTracks,
    useUploadTrack
}