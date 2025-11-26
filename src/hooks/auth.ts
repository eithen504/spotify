import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { User } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useCheckAuth = () => {
    return useQuery<User>({
        queryKey: ["checkAuth"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/v1/auth/checkAuth`, {
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

const useVerifyGoogleToken = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (token: string) => {
            const res = await fetch(`${baseUrl}/api/v1/auth/verify-google-token`, {
                method: "POST", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            });

            const { data } = await res.json()
            return data

        },

        onSuccess: (data) => {
            queryClient.setQueryData(['checkAuth'], () => (
                {
                    _id: data._id,
                    email: data._id,
                    displayName: data.displayName,
                    avatarUrl: data.avatarUrl,
                    bio: data.bio,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }
            ))

            queryClient.invalidateQueries({
                queryKey: ['getRecentPlaylists'],
            });

            navigate("/", { replace: true });
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })
}

const useLogoutUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await fetch(`${baseUrl}/api/v1/auth/logout-user`, {
                method: "POST", // or POST, PUT, etc.
                credentials: "include", // IMPORTANT: send cookies along
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },

        onSuccess: () => {
            setTimeout(() => {
                queryClient.setQueryData(['checkAuth'], null);
                toast.success("Logout Successfully.");
            }, 1000)
        }
    })
}

export {
    useCheckAuth,
    useVerifyGoogleToken,
    useLogoutUser
}