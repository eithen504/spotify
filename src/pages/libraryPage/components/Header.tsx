import React, { useEffect, useState } from "react";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { useCheckAuth, useLogoutUser } from "../../../hooks/auth";
import { useDeleteFolder, useGetFolderPlaylists, useUpdateFolder, useUploadFolder } from "../../../hooks/folder";
import type { MenuOptions, Playlist } from "../../../types";
import { AddPlaylistIcon, AlertIcon, DeleteIcon, EditIcon, ExternalLinkIcon, FolderIcon, LeftArrowIcon, MusicIcon, PlusIcon, PodcastIcon, RightArrowIndicatorIcon, SearchIcon } from "../../../Svgs";
import UploadPlaylistDialog from "../../../components/UploadPlaylistDialog";
import UploadTrackDialog from "../../../components/UploadTrackDialog";
import EditFolderDialog from "../../../components/EditFolderDialog";
import UserOptionsSidePanel from "../../../components/UserOptionsSidePanel";
import { useNavigate } from "react-router-dom";
import CreateOptionsDrawer from "./CreateOptionsDrawer";

type HeaderProps = {
    setIsSearchLibraryActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ setIsSearchLibraryActive }) => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();

    /* ---------- Local States ---------- */
    const [isUserSidePanelOpen, setIsUserSidePanelOpen] = useState(false);
    const [userSidePanelOptions, setUserSidePanelOptions] = useState<MenuOptions>([]);
    const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

    const [isFolderDrawerOpen, setIsFolderDrawerOpen] = useState(false);
    const [createDrawerOptions, setCreateDrawerOptions] = useState<MenuOptions>([]);
    const [folderDrawerOptions, setFolderDrawerOptions] = useState<MenuOptions>([]);

    const [isUploadPlaylistDialogOpen, setIsUploadPlaylistDialogOpen] = useState(false);
    const [isUploadTrackDialogOpen, setIsUploadTrackDialogOpen] = useState(false);
    const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false);


    /* ---------- Stores ---------- */
    const { openedFolder, setOpenedFolder } = useUIPreferencesStore();
    const { id: openedFolderId, name: openedFolderName } = openedFolder;

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { mutateAsync: uploadFolder } = useUploadFolder();
    const { mutateAsync: logoutUser } = useLogoutUser();
    const { mutateAsync: updateFolder, isPending } = useUpdateFolder();
    const { mutateAsync: deleteFolder } = useDeleteFolder();
    const { data: playlists } = useGetFolderPlaylists(openedFolderId);

    /* ---------- Methods Or Functions ---------- */
    const navigateBackFromFolder = () => {
        const updatedFolder = { id: "", name: "" };
        setOpenedFolder(updatedFolder);
    }

    const handleUpdateFolder = (payload: { name?: string, playlistIds?: string[] }) => {
        setIsEditFolderDialogOpen(false);
        if (payload.name == openedFolderName) return;
        updateFolder(payload);
    }

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        if (!currentUser) return;

        const adminId = import.meta.env.VITE_ADMIN_ID;
        const isAdminProfile = currentUser._id == adminId;

        if (isAdminProfile) {
            setCreateDrawerOptions([
                {
                    icon: <AddPlaylistIcon width="25" height="25" />,
                    label: 'Playlist',
                    sublabel: 'Create a playlist with tracks or episodes',
                    action: () => {
                        setIsCreateDrawerOpen(false);
                        setIsUploadPlaylistDialogOpen(true)
                    }
                },
                {
                    icon: <MusicIcon width="25" height="25" />,
                    label: 'Track',
                    sublabel: 'Create a track for this application',
                    action: () => {
                        setIsCreateDrawerOpen(false);
                        setIsUploadTrackDialogOpen(true)
                    },
                    hasTopBorder: true
                },
                {
                    icon: <FolderIcon width="25" height="25" />,
                    label: 'Folder',
                    sublabel: 'Organise your playlists',
                    action: () => {
                        uploadFolder({ name: `New Folder ${Date.now()}`, playlistIds: [] })
                    }
                }
            ])
        } else {
            setCreateDrawerOptions([
                {
                    icon: <AddPlaylistIcon width="25" height="25" />,
                    label: 'Playlist',
                    sublabel: 'Create a playlist with tracks or episodes',
                    action: () => {
                        setIsCreateDrawerOpen(false);
                        setIsUploadPlaylistDialogOpen(true)
                    }
                },
                {
                    icon: <PodcastIcon width="25" height="25" />,
                    label: 'Podcast Episode',
                    sublabel: 'Create a episode for this application',
                    action: () => {
                        setIsCreateDrawerOpen(false);
                        setIsUploadTrackDialogOpen(true)
                    },
                    hasTopBorder: true
                },
                {
                    icon: <FolderIcon width="25" height="25" />,
                    label: 'Folder',
                    sublabel: 'Organise your playlists',
                    action: () => {
                        uploadFolder({ name: `New Folder ${Date.now()}`, playlistIds: [] })
                    }
                }
            ])
        }
    }, [currentUser])

    useEffect(() => {
        if (!playlists) return;

        setFolderDrawerOptions([
            {
                icon: <EditIcon width="16" height="16" />,
                label: 'Rename',
                action: () => {
                    setIsEditFolderDialogOpen(true);
                    setIsFolderDrawerOpen(false);
                }
            },
            {
                icon: <AlertIcon width="16" height="16" />,
                label: 'Delete',
                action: async () => {
                    await deleteFolder();
                    setIsFolderDrawerOpen(false);
                },
                hasTopBorder: true
            },
            {
                icon: <FolderIcon width="16" height="16" />,
                label: 'Remove From Folder',
                action: () => { },
                rightSideIcon: <RightArrowIndicatorIcon width="12" height="12" />,
                subMenu: playlists?.map((playlist: Playlist) => {
                    return {
                        icon: <DeleteIcon width="16" height="16" />,
                        label: playlist.title,
                        action: () => {
                            const filteredPlaylists = playlists.filter((p: Playlist) => p._id != playlist._id)

                            updateFolder({ playlists: filteredPlaylists })
                        }
                    }
                })
            }
        ])
    }, [playlists])

    useEffect(() => {
        if (!currentUser) return

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
                        setIsUploadTrackDialogOpen(true)
                        setIsUserSidePanelOpen(false)
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Playlist',
                    action: () => {
                        setIsUploadPlaylistDialogOpen(true)
                        setIsUserSidePanelOpen(false)
                    }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Album',
                    action: () => {
                        // setIsUploadAlbumDialogOpen(true)
                        setIsUserSidePanelOpen(false)
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
                    action: () => { logoutUser() },
                    hasTopBorder: true
                },
            ])
        }
    }, [currentUser])

    return (
        <>
            <div className="flex items-center justify-between mb-1 px-5 py-4">
                <div className="flex gap-2 items-center overflow-hidden">
                    <div
                        className={`text-md font-bold text-[#ffffff] transition-all duration-400`}
                    >
                        {openedFolderId ? (
                            <div className="text-[#8f8f8f] flex items-center w-full space-x-3">
                                {/* Left Arrow Button */}
                                <button
                                    className="dynamic-text-hover cursor-pointer flex-shrink-0"
                                    onClick={navigateBackFromFolder}
                                >
                                    <LeftArrowIcon width="18" height="18" />
                                </button>

                                {/* Folder Name */}
                                <span
                                    className="dynamic-text-hover cursor-pointer truncate flex-1 min-w-0"
                                    onClick={() => setIsEditFolderDialogOpen(true)}
                                >
                                    {openedFolderName}
                                </span>
                            </div>
                        ) : (
                            <div className="text-[#ffffff] flex items-center w-full space-x-3">
                                {/* User Profile */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setIsUserSidePanelOpen(true)}
                                >
                                    <img
                                        src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                                        alt="Liked Songs"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                </div>

                                <span className="truncate flex-1 min-w-0">
                                    Your Library
                                </span>
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex items-center space-x-6">
                    <button
                        className="text-[#8f8f8f] dynamic-text-hover flex items-center justify-center transition cursor-pointer"
                        onClick={() => setIsSearchLibraryActive(true)}
                    >
                        <SearchIcon width="20" height="20" />
                    </button>

                    {
                        openedFolderId && (
                            // <div className="relative" ref={folderMenuRef}>
                            //     <button
                            //         className="text-[#8f8f8f] dynamic-text-hover flex items-center justify-center transition cursor-pointer"
                            //         title={`More Options For ${name}`}
                            //         onClick={() => setIsFolderMenuOpen(true)}
                            //     >
                            //         <MoreIcon width="24" height="24" />
                            //     </button>

                            //     {isFolderMenuOpen && (
                            //         <FolderOptionsMenu
                            //             options={folderDrawerOptions}
                            //             folderMenuRef={folderMenuRef}
                            //             onClose={() => setIsFolderMenuOpen(false)}
                            //         />
                            //     )}
                            // </div>
                            <>
                            </>
                        )
                    }

                    <button
                        className="text-[#8f8f8f] dynamic-text-hover flex items-center justify-center transition cursor-pointer"
                        title={"Create Playlists, Folders And More"}
                        onClick={() => setIsCreateDrawerOpen(true)}
                    >
                        <PlusIcon width="20" height="20" />
                    </button>
                </div>


                {
                    isUploadPlaylistDialogOpen &&
                    <UploadPlaylistDialog
                        isOpen={isUploadPlaylistDialogOpen}
                        onClose={() => setIsUploadPlaylistDialogOpen(false)}
                    />
                }

                {
                    isUploadTrackDialogOpen &&
                    <UploadTrackDialog
                        isOpen={isUploadTrackDialogOpen}
                        onClose={() => setIsUploadTrackDialogOpen(false)}
                    />
                }

                {
                    isEditFolderDialogOpen &&
                    <EditFolderDialog
                        isOpen={isEditFolderDialogOpen}
                        onClose={() => setIsEditFolderDialogOpen(false)}
                        defaultName={openedFolderName}
                        isPending={isPending}
                        handleUpdateFolder={handleUpdateFolder}
                    />
                }
            </div>

            <UserOptionsSidePanel
                isOpen={isUserSidePanelOpen}
                options={userSidePanelOptions}
                onClose={() => setIsUserSidePanelOpen(false)}
            />

            {isCreateDrawerOpen && (
                <CreateOptionsDrawer
                    options={createDrawerOptions}
                    onClose={() => setIsCreateDrawerOpen(false)}
                    height="263px"
                />
            )}
        </>
    )
}

export default Header