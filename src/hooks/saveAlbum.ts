import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Album } from "../types";
import { useCheckAuth } from "./auth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useSaveAlbum = () => {
    const queryClient = useQueryClient();
    const { data: currentUser } = useCheckAuth();

    return useMutation({
        mutationFn: async (album: Album) => {
            if (!currentUser) throw new Error("Please Login Or Signup First!");

            const res = await fetch(`${baseUrl}/api/v1/saveAlbum/${album._id}`, {
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

            return { album, isSaved: data.isSaved };
        },

        onSuccess: ({ album, isSaved }) => {
            if (isSaved) {
                queryClient.setQueryData(
                    ["getCurrentUserSaveAlbums"],
                    (prev: Album[]) => {
                        if (!prev) return prev;

                        return [
                            ...prev,
                            {
                                _id: album._id,
                                title: album.title,
                                coverImageUrl: album.coverImageUrl,
                                createdAt: album.createdAt,
                                updatedAt: album.updatedAt
                            }
                        ]
                    }
                )
                toast.success("Added To Save album")
            }
            else {
                queryClient.setQueryData(
                    ["getCurrentUserSaveAlbums"],
                    (prev: Album[]) => {
                        if (!prev) return prev;

                        return prev.filter((a) => a._id != album._id)
                    }
                )
                toast.success("Remove From Save album")
            }

            queryClient.setQueryData(
                ["getAlbumTracks", album._id],
                (prev: any) => {
                    if (!prev) return prev; // safety check in case cache is empty

                    return {
                        ...prev,
                        album: {
                            ...prev.album,
                            hasSaved: !prev.album.hasSaved, // or true / a variable if needed
                        },
                    };
                }
            );
        },

        onError: (error) => {
            toast.error(error.message);
        }
    })
}

export {
    useSaveAlbum
}