import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { MenuOptions } from "../../../../types";
import UploadTrackDialog from "../../../../components/UploadTrackDialog";
import { useCheckAuth, useLogoutUser } from "../../../../hooks/auth";
import { ExternalLinkIcon, PlusIcon } from "../../../../Svgs";
import UploadPlaylistDialog from "../../../../components/UploadPlaylistDialog";
import UploadAlbumDialog from "../../../../components/UploadAlbumDialog";
import UserOptionsMenu from "./UserOptionsMenu";

const RightSection = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate(); 

    /* ---------- Local States ---------- */
    const [userMenuOptions, setUserMenuOptions] = useState<MenuOptions>([]);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isUploadTrackDialogOpen, setIsUploadTrackDialogOpen] = useState(false);
    const [isUploadPlaylistDialogOpen, setIsUploadPlaylistDialogOpen] = useState(false);
    const [isUploadAlbumDialogOpen, setIsUploadAlbumDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const userMenuRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Stores ---------- */
    const { data: currentUser, isLoading } = useCheckAuth();
    const { mutateAsync: logoutUser } = useLogoutUser();

    /* ---------- Derived Values ---------- */
    const isUnauthenticated = !isLoading && !currentUser;

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        if (!currentUser) return;

        const adminId = import.meta.env.VITE_ADMIN_ID;
        const isAdminProfile = currentUser._id == adminId;

        if (isAdminProfile) {
            setUserMenuOptions([
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Account',
                    action: () => navigate("/account")
                },
                {
                    label: 'Profile',
                    action: () => navigate(`/show/${currentUser._id}`)
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Track',
                    action: () => {
                        setIsUploadTrackDialogOpen(true);
                        setIsUserMenuOpen(false);
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Playlist',
                    action: () => {
                        setIsUploadPlaylistDialogOpen(true);
                        setIsUserMenuOpen(false);
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Album',
                    action: () => {
                        setIsUploadAlbumDialogOpen(true);
                        setIsUserMenuOpen(false);
                    }
                },
                {
                    label: 'Settings',
                    action: () => { }
                },
                {
                    label: 'Log out',
                    action: () => { logoutUser() },
                    hasTopBorder: true
                },
            ])

        } else {
            setUserMenuOptions([
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Account',
                    action: () => navigate("/account")
                },
                {
                    label: 'Profile',
                    action: () => navigate(`/show/${currentUser._id}`)
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Upgrade to Premium',
                    action: () => { },
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Support',
                    action: () => { }
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Download',
                    action: () => { },
                }, {
                    label: 'Settings',
                    action: () => { },
                },
                {
                    label: 'Log out',
                    action: () => { logoutUser() },
                    hasTopBorder: true
                },
            ])
        }
    }, [currentUser])

    return (
        <div className="relative flex items-center gap-4">
            {
                isUnauthenticated ? (
                    <>
                        <button className="hidden lg:block cursor-pointer text-gray-400 dynamic-text-hover text-sm font-semibold py-1.5 px-4 rounded-full"
                            onClick={() => navigate("/auth")}
                        >
                            Sign up
                        </button>

                        <button className="bg-white text-black cursor-pointer text-sm font-semibold py-2 px-6 rounded-full"
                            onClick={() => navigate("/auth")}
                        >
                            Login
                        </button>
                    </>
                ) : (
                    <>
                        {/* Browse Premium */}
                        <button
                            className="hidden lg:block text-black bg-[#ffffff] py-1.5 px-4 rounded-full text-sm font-semibold cursor-pointer"
                            title="Explore Premium"
                        >
                            Explore Premium
                        </button>

                        {/* User Icon */}
                        <div className="relative flex items-center" ref={userMenuRef}>
                            <div
                                className="bg-[#121212] dynamic-bg-hover p-2 rounded-full cursor-pointer"
                                style={{
                                    '--bgHoverColor': '#1F1F1F',
                                } as React.CSSProperties}
                                onClick={() => setIsUserMenuOpen(true)}
                            >
                                {
                                    currentUser?.avatarUrl ? (
                                        <img src={currentUser?.avatarUrl} className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm cursor-pointer">
                                            {currentUser?.displayName?.[0].toUpperCase()}
                                        </button>
                                    )
                                }
                            </div>

                            {/* User Menu Dropdown */}
                            {isUserMenuOpen && (
                                <UserOptionsMenu
                                    options={userMenuOptions}
                                    userMenuRef={userMenuRef}
                                    onClose={() => setIsUserMenuOpen(false)}
                                />
                            )}
                        </div>
                    </>
                )
            }

            {
                isUploadTrackDialogOpen && <UploadTrackDialog isOpen={isUploadTrackDialogOpen} onClose={() => setIsUploadTrackDialogOpen(false)} />
            }

            {
                isUploadPlaylistDialogOpen && <UploadPlaylistDialog isOpen={isUploadPlaylistDialogOpen} onClose={() => setIsUploadPlaylistDialogOpen(false)} />
            }

            {
                isUploadAlbumDialogOpen && <UploadAlbumDialog isOpen={isUploadAlbumDialogOpen} onClose={() => setIsUploadAlbumDialogOpen(false)} />
            }
        </div>
    );
};

export default RightSection;
