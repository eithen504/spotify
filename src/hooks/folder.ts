import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import type { Folder, Playlist } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetFolderPlaylists = (id: string) => {
    return useQuery({
        queryKey: ["getFolderPlaylists", id],
        queryFn: async () => {
            if (!id) return []
            const res = await fetch(`${baseUrl}/api/v1/folder/${id}`, {
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

const useUploadFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: { name: string, playlistIds: string[] }) => {
            const res = await fetch(`${baseUrl}/api/v1/folder`, {
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

        onSuccess: (folder: Folder) => {
            toast.success("Folder Created Successfully");
            queryClient.setQueryData(["getCurrentUserFolders"], (prev: Folder[]) => {
                if (!prev) return prev;

                return [folder, ...prev]
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useUpdateFolder = () => {
    const queryClient = useQueryClient();
    const { preferences: { activeFolder: { id: activeFolderId } }, setPreferences } = useUIPreferencesStore();

    return useMutation({
        mutationFn: async (payload: { name?: string, playlists?: Playlist[] }) => {
            const { name, playlists } = payload;
            const playlistIds = playlists?.map((p) => p._id);

            const res = await fetch(`${baseUrl}/api/v1/folder/${activeFolderId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: {
                        name,
                        playlistIds
                    }
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return { updatedFolder: data, playlists };
        },

        onSuccess: ({ updatedFolder, playlists }: { updatedFolder: Folder, playlists?: Playlist[] }) => {
            toast.success("Folder updated Successfully");

            const folder = { id: updatedFolder._id, name: updatedFolder.name }
            setPreferences({ activeFolder: folder });
            localStorage.setItem("folder", JSON.stringify(folder));

            queryClient.setQueryData(["getCurrentUserFolders"], (prev: Folder[]) => {
                if (!prev) return prev;

                return prev.map((f) => {
                    if (f._id == updatedFolder._id) {
                        return {
                            ...f,
                            name: updatedFolder.name
                        }
                    }

                    return f;
                })
            })

            queryClient.setQueryData(["getFolderPlaylists", updatedFolder._id], (prev: Playlist[]) => {
                if (!prev) return prev;

                return playlists || prev;
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useDeleteFolder = () => {
    const { preferences: { activeFolder: { id: activeFolderId } }, setPreferences } = useUIPreferencesStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/folder/${activeFolderId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return data;
        },

        onSuccess: (folder: Folder) => {
            toast.success("Folder Deleted Successfully");

            const updatedFolder = { id: "", name: "" };
            setPreferences({ activeFolder: updatedFolder });
            localStorage.setItem("folder", JSON.stringify(updatedFolder));

            queryClient.setQueryData(["getCurrentUserFolders"], (prev: Folder[]) => {
                if (!prev) return prev;

                return prev.filter((f) => f._id != folder._id)
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useAddItemToFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: { folderId: string, playlist: Playlist }) => {
            const { folderId, playlist } = payload;
            const res = await fetch(`${baseUrl}/api/v1/folder/${folderId}/items`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payload: { playlistId: playlist._id }
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.errorMessage || "Something went wrong");
            }

            return { folder: data, playlist };
        },

        onSuccess: ({ folder, playlist }: { folder: Folder, playlist: Playlist }) => {
            toast.success(`Added To The Folder ${folder.name} Successfully!`);

            queryClient.setQueryData(["getFolderPlaylists", folder._id], (prev: Playlist[]) => {
                if (!prev) return prev;

                return [
                    playlist,
                    ...prev
                ]
            })
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useFolderActions = () => {
    const { setPreferences } = useUIPreferencesStore();

    const navigateToFolder = (folderData: { id: string, name: string }) => {
        setPreferences({ activeFolder: folderData });
        localStorage.setItem("folder", JSON.stringify(folderData));
    }

    return {
        navigateToFolder
    }
}

export {
    useGetFolderPlaylists,
    useUploadFolder,
    useUpdateFolder,
    useDeleteFolder,
    useAddItemToFolder,
    useFolderActions
}