import { useEffect, useRef, useState } from "react";
import { useBreakPoint } from "../../../../../hooks/breakPoint";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import { AddPlaylistIcon, AlertIcon, CollapsedIcon, DeleteIcon, EditIcon, ExpandIcon, FolderIcon, LeftArrowIcon, LibraryIcon, MinimizeIcon, MoreIcon, MusicIcon, PlusIcon, PodcastIcon, RightArrowIndicatorIcon, UnCollapsedIcon } from "../../../../../Svgs"
import type { MenuOptions, Playlist } from "../../../../../types";
import { useCheckAuth } from "../../../../../hooks/auth";
import UploadPlaylistDialog from "../../../../../components/UploadPlaylistDialog";
import UploadTrackDialog from "../../../../../components/UploadTrackDialog";
import { useDeleteFolder, useGetFolderPlaylists, useUpdateFolder, useUploadFolder } from "../../../../../hooks/folder";
import EditFolderDialog from "../../../../../components/EditFolderDialog";
import FolderOptionsMenu from "./FolderOptionsMenu";
import CreateOptionsMenu from "./CreateOptionsMenu";

const Header = () => {
    /* ---------- Local States ---------- */
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const [isFolderMenuOpen, setIsFolderMenuOpen] = useState(false);
    const [createMenuOptions, setCreateMenuOptions] = useState<MenuOptions>([]);
    const [folderMenuOptions, setFolderMenuOptions] = useState<MenuOptions>([]);
    const [isUploadPlaylistDialogOpen, setIsUploadPlaylistDialogOpen] = useState(false);
    const [isUploadTrackDialogOpen, setIsUploadTrackDialogOpen] = useState(false);
    const [isEditFolderDialogOpen, setIsEditFolderDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const createMenuRef = useRef<HTMLDivElement | null>(null);
    const folderMenuRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Stores ---------- */
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { leftSidebar, activeFolder } = preferences;
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { id: activeTrackId, name: activeFolderName } = activeFolder;

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { data: playlists } = useGetFolderPlaylists(activeTrackId);
    const { breakPoint } = useBreakPoint();
    const { mutateAsync: uploadFolder } = useUploadFolder();
    const { mutateAsync: updateFolder, isPending } = useUpdateFolder();
    const { mutateAsync: deleteFolder } = useDeleteFolder();

    /* ---------- Methods Or Functions ---------- */
    const handleCollapsedLibrary = () => {
        if (breakPoint == "lg") {
            const updatedLeftSidebar = { ...leftSidebar, panelSize: 7 };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }

        if (breakPoint == "md") {
            const updatedLeftSidebar = { ...leftSidebar, panelSize: 10 };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    }

    const handleOpenLibrary = () => {
        if (breakPoint == "lg") {
            const updatedLeftSidebar = { ...leftSidebar, panelSize: 22 };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }

        if (breakPoint == "md") {
            const updatedLeftSidebar = { ...leftSidebar, panelSize: 32 };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    }

    const handleToggleExpandLibrary = () => {
        if (isLeftSidebarExpanded) {
            const updatedLeftSidebar = {
                ...leftSidebar,
                panelSize: breakPoint == "lg" ? 22 : 32,
                isExpanded: false
            };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        } else {
            const updatedLeftSidebar = {
                ...leftSidebar,
                panelSize: 100,
                isExpanded: true
            };
            const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
            setPreferences({ leftSidebar: updatedLeftSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    }

    const navigateBackFromFolder = () => {
        const updatedFolder = { id: "", name: "" };
        setPreferences({ activeFolder: updatedFolder });
        localStorage.setItem("folder", JSON.stringify(updatedFolder));
    }

    const handleUpdateFolder = (payload: { name?: string, playlistIds?: string[] }) => {
        setIsEditFolderDialogOpen(false);
        if (payload.name == name) return;
        updateFolder(payload);
    }

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        if (!currentUser) return;

        const adminId = import.meta.env.VITE_ADMIN_ID;
        const isAdminProfile = currentUser._id == adminId;

        if (isAdminProfile) {
            setCreateMenuOptions([
                {
                    icon: <AddPlaylistIcon width="20" height="20" />,
                    label: 'Playlist',
                    sublabel: 'Create a playlist with tracks or episodes',
                    action: () => {
                        setIsCreateMenuOpen(false);
                        setIsUploadPlaylistDialogOpen(true)
                    }
                },
                {
                    icon: <MusicIcon width="20" height="20" />,
                    label: 'Track',
                    sublabel: 'Create a track for this application',
                    action: () => {
                        setIsCreateMenuOpen(false);
                        setIsUploadTrackDialogOpen(true)
                    },
                    hasTopBorder: true
                },
                {
                    icon: <FolderIcon width="20" height="20" />,
                    label: 'Folder',
                    sublabel: 'Organise your playlists',
                    action: () => {
                        uploadFolder({ name: `New Folder ${Date.now()}`, playlistIds: [] })
                    }
                }
            ])
        } else {
            setCreateMenuOptions([
                {
                    icon: <AddPlaylistIcon width="20" height="20" />,
                    label: 'Playlist',
                    sublabel: 'Create a playlist with tracks or episodes',
                    action: () => {
                        setIsCreateMenuOpen(false);
                        setIsUploadPlaylistDialogOpen(true)
                    }
                },
                {
                    icon: <PodcastIcon width="20" height="20" />,
                    label: 'Podcast Episode',
                    sublabel: 'Create a episode for this application',
                    action: () => {
                        setIsCreateMenuOpen(false);
                        setIsUploadTrackDialogOpen(true)
                    },
                    hasTopBorder: true
                },
                {
                    icon: <FolderIcon width="20" height="20" />,
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

        setFolderMenuOptions([
            {
                icon: <EditIcon width="16" height="16" />,
                label: 'Rename',
                action: () => {
                    setIsEditFolderDialogOpen(true);
                    setIsFolderMenuOpen(false);
                }
            },
            {
                icon: <AlertIcon width="16" height="16" />,
                label: 'Delete',
                action: async () => {
                    await deleteFolder();
                    setIsFolderMenuOpen(false);
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

    return (
        <div className="flex items-center justify-between mb-1 px-5 py-3">
            {
                leftPanelSize >= 22 ? (
                    <>
                        <div className="flex gap-2 items-center overflow-hidden">
                            {
                                !isLeftSidebarExpanded && (
                                    <button
                                        className="text-[#8f8f8f] dynamic-text-hover cursor-pointer transform group-header-hover-translate group-header-hover transition duration-400 ease-out"
                                        title="Collapse Your library"
                                        onClick={handleCollapsedLibrary}
                                    >
                                        <CollapsedIcon width="17" height="17" />
                                    </button>
                                )
                            }

                            <div
                                className={`text-md font-bold text-[#ffffff] ${isLeftSidebarExpanded ? "ml-0" : "-ml-[25px] group-header-hover-ml"} transition-all duration-400`}
                            >
                                {activeTrackId ? (
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
                                            {activeFolderName}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="text-[#ffffff] cursor-pointer flex items-center w-full space-x-3"
                                        onClick={handleCollapsedLibrary}
                                    >
                                        <span className="truncate flex-1 min-w-0">
                                            Your Library
                                        </span>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="relative" ref={createMenuRef}>
                                <button
                                    className="p-[10px] rounded-full text-[#8f8f8f] dynamic-text-hover bg-[#1f1f1f] dynamic-bg-hover flex items-center justify-center transition cursor-pointer"
                                    style={{
                                        '--bgHoverColor': '#282828'
                                    } as React.CSSProperties}
                                    title={"Create Playlists, Folders And More"}
                                    onClick={() => setIsCreateMenuOpen(true)}
                                >
                                    <PlusIcon width="16" height="16" />
                                </button>

                                {isCreateMenuOpen && (
                                    <CreateOptionsMenu
                                        options={createMenuOptions}
                                        createMenuRef={createMenuRef}
                                        onClose={() => setIsCreateMenuOpen(false)}
                                    />
                                )}
                            </div>

                            {
                                activeTrackId && (
                                    <div className="relative" ref={folderMenuRef}>
                                        <button
                                            className="p-[6px] rounded-full text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover flex items-center justify-center transition cursor-pointer"
                                            style={{
                                                '--bgHoverColor': '#1f1f1f'
                                            } as React.CSSProperties}
                                            title={`More Options For ${name}`}
                                            onClick={() => setIsFolderMenuOpen(true)}
                                        >
                                            <MoreIcon width="22" height="22" />
                                        </button>

                                        {isFolderMenuOpen && (
                                            <FolderOptionsMenu
                                                options={folderMenuOptions}
                                                folderMenuRef={folderMenuRef}
                                                onClose={() => setIsFolderMenuOpen(false)}
                                            />
                                        )}
                                    </div>
                                )
                            }

                            <button
                                className="p-[9.5px] rounded-full text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover flex items-center justify-center transition cursor-pointer"
                                style={{
                                    '--bgHoverColor': '#1f1f1f'
                                } as React.CSSProperties}
                                title={isLeftSidebarExpanded ? "Minimize Your Library" : "Expand Your Library"}
                                onClick={handleToggleExpandLibrary}
                            >
                                {
                                    isLeftSidebarExpanded ? (
                                        <MinimizeIcon width="16" height="16" />
                                    ) : (
                                        <ExpandIcon width="16" height="16" />
                                    )
                                }
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
                            <button
                                className="text-[#8f8f8f] dynamic-text-hover transition mt-[6px] cursor-pointer group/button"
                                title="Open Your library"
                                onClick={handleOpenLibrary}
                            >
                                <span className="block group-hover/button:hidden">
                                    <LibraryIcon />
                                </span>
                                <span className="hidden group-hover/button:block">
                                    <UnCollapsedIcon />
                                </span>
                            </button>

                            {
                                activeTrackId && (
                                    <button
                                        className="cursor-pointer text-[#8f8f8f] dynamic-text-hover"
                                        title={`Go Back From ${name}`}
                                        onClick={navigateBackFromFolder}
                                    >
                                        <LeftArrowIcon width="18" height="18" />
                                    </button>
                                )
                            }

                            <div className="relative" ref={createMenuRef}>
                                <button
                                    className="text-[#8f8f8f] dynamic-text-hover bg-[#1f1f1f] dynamic-bg-hover transition p-[10px] rounded-full cursor-pointer"
                                    style={{
                                        '--bgHoverColor': '#282828'
                                    } as React.CSSProperties}
                                    onClick={() => setIsCreateMenuOpen(true)}
                                >
                                    <PlusIcon width="16" height="16" />
                                </button>

                                {isCreateMenuOpen && (
                                    <CreateOptionsMenu
                                        options={createMenuOptions}
                                        createMenuRef={createMenuRef}
                                        onClose={() => setIsCreateMenuOpen(false)}
                                    />
                                )}
                            </div>
                        </div>

                    </>
                )
            }

            {
                isUploadPlaylistDialogOpen && <UploadPlaylistDialog isOpen={isUploadPlaylistDialogOpen} onClose={() => setIsUploadPlaylistDialogOpen(false)} />
            }

            {
                isUploadTrackDialogOpen && <UploadTrackDialog isOpen={isUploadTrackDialogOpen} onClose={() => setIsUploadTrackDialogOpen(false)} />
            }

            {
                isEditFolderDialogOpen &&
                <EditFolderDialog
                    isOpen={isEditFolderDialogOpen}
                    onClose={() => setIsEditFolderDialogOpen(false)}
                    defaultName={activeFolderName}
                    isPending={isPending}
                    handleUpdateFolder={handleUpdateFolder}
                />
            }
        </div>
    )
}

export default Header