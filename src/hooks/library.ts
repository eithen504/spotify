import { useQuery } from "@tanstack/react-query";
import type { LeftSidebarTab } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetCurrentUserLibraryItems = (activeTab: LeftSidebarTab) => {
    if (activeTab == "Playlists") {
        return useQuery({
            queryKey: ["getCurrentUserPlaylists"],
            queryFn: async () => {
                const res = await fetch(`${baseUrl}/api/v1/playlist/me`, {
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

    else if (activeTab == "Save Playlists") {
        return useQuery({
            queryKey: ["getCurrentUserSavePlaylists"],
            queryFn: async () => {
                const res = await fetch(`${baseUrl}/api/v1/savePlaylist`, {
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

    else if (activeTab == "Save Albums") {
        return useQuery({
            queryKey: ["getCurrentUserSaveAlbums"],
            queryFn: async () => {
                const res = await fetch(`${baseUrl}/api/v1/saveAlbum`, {
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

    return useQuery({
        queryKey: ["getCurrentUserFolders"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/folder/me`, {
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

export {
    useGetCurrentUserLibraryItems
}