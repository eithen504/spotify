import React, { useEffect, useState } from 'react'
import { DEFAULT_USER_IMAGE_URL, HOMEPAGE_TABS } from '../../../constants'
import { useScrollStore } from '../../../store/useScrollStore'
import { useCheckAuth, useLogoutUser } from '../../../hooks/auth'
import UserOptionsSidePanel from '../../../components/UserOptionsSidePanel'
import type { MenuOptions } from '../../../types'
import { ExternalLinkIcon, PlusIcon } from '../../../Svgs'
import { useNavigate } from 'react-router-dom'
import UploadTrackDialog from '../../../components/UploadTrackDialog'
import UploadPlaylistDialog from '../../../components/UploadPlaylistDialog'
import UploadAlbumDialog from '../../../components/UploadAlbumDialog'

interface TabSectionProps {
    background: string
}

const TabsSection: React.FC<TabSectionProps> = ({ background }) => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("All");
    const [isUserSidePanelOpen, setIsUserSidePanelOpen] = useState(false);
    const [userSidePanelOptions, setUserSidePanelOptions] = useState<MenuOptions>([]);

    const [isUploadTrackDialogOpen, setIsUploadTrackDialogOpen] = useState(false);
    const [isUploadPlaylistDialogOpen, setIsUploadPlaylistDialogOpen] = useState(false);
    const [isUploadAlbumDialogOpen, setIsUploadAlbumDialogOpen] = useState(false);

    const { scrollFromTop } = useScrollStore();

    const { data: currentUser } = useCheckAuth();
    const { mutateAsync: logoutUser } = useLogoutUser();

    useEffect(() => {
        if (!currentUser) return;

        const adminId = import.meta.env.VITE_ADMIN_ID;
        const isAdminProfile = currentUser._id == adminId;

        if (isAdminProfile) {
            setUserSidePanelOptions([
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
                        setIsUserSidePanelOpen(false);
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Playlist',
                    action: () => {
                        setIsUploadPlaylistDialogOpen(true);
                        setIsUserSidePanelOpen(false);
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Album',
                    action: () => {
                        setIsUploadAlbumDialogOpen(true);
                        setIsUserSidePanelOpen(false);
                    }
                },
                {
                    label: 'Settings',
                    action: () => { }
                },
                {
                    label: 'Log out',
                    action: () => {
                        logoutUser();
                        setIsUserSidePanelOpen(false);
                    },
                    hasTopBorder: true
                },
            ])
        } else {
            setUserSidePanelOptions([
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
                    action: () => {
                        logoutUser();
                        setIsUserSidePanelOpen(false);
                    },
                    hasTopBorder: true
                },
            ])
        }
    }, [currentUser])

    return (
        <>
            <div className="fixed md:sticky top-0 left-0 w-full z-50">
                {/* Background layer with scroll-dependent opacity */}
                <div
                    className="absolute inset-0"
                    style={{
                        background,
                        opacity: scrollFromTop / 250,
                    }}
                />

                {/* Tabs container - always fully opaque */}
                <div className="relative flex items-center space-x-3 max-w-[90rem] mx-auto px-4 md:px-10 py-4">
                    {
                        currentUser && (
                            <div
                                className="cursor-pointer flex-shrink-0 block md:hidden"
                                onClick={() => setIsUserSidePanelOpen(true)}
                            >
                                <img
                                    src={currentUser?.avatarUrl || DEFAULT_USER_IMAGE_URL}
                                    alt="Liked Songs"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </div>
                        )
                    }

                    {HOMEPAGE_TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`${activeTab === tab
                                ? "text-black bg-white"
                                : "text-[#ffffff] bg-white/15 hover:bg-white/25"
                                } cursor-pointer backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <UserOptionsSidePanel
                isOpen={isUserSidePanelOpen}
                options={userSidePanelOptions}
                onClose={() => setIsUserSidePanelOpen(false)}
            />

            {
                isUploadTrackDialogOpen && <UploadTrackDialog isOpen={isUploadTrackDialogOpen} onClose={() => setIsUploadTrackDialogOpen(false)} />
            }

            {
                isUploadPlaylistDialogOpen && <UploadPlaylistDialog isOpen={isUploadPlaylistDialogOpen} onClose={() => setIsUploadPlaylistDialogOpen(false)} />
            }

            {
                isUploadAlbumDialogOpen && <UploadAlbumDialog isOpen={isUploadAlbumDialogOpen} onClose={() => setIsUploadAlbumDialogOpen(false)} />
            }
        </>
    )
}

export default TabsSection