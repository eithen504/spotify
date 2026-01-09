import { useEffect, useState } from "react"
import { useBreakPoint } from "../hooks/breakPoint"
import DesktopLayout from "./desktopLayout/DesktopLayout"
import MobileLayout from "./mobileLayout/MobileLayout"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore"
import type { TableView } from "../types"
import { TABLE_COLUMNS_CONFIG_KEY, TABLE_VIEW_KEY, OPENED_FOLDER_KEY, LEFT_SIDEBAR_KEY, LIBRARY_KEY, RIGHT_SIDEBAR_KEY, MINI_PLAYER_WINDOW_OPEN_KEY, SYSTEM_VOLUME_KEY } from "../constants"
import { useCheckAuth } from "../hooks/auth"
import { LogoIcon } from "../Svgs"
import { validateAlbumTableColumns, validateLeftSidebar, validateLibrary, validateOpenedFolder, validatePlaylistTableColumns, validateRightSidebar, validateSystemVolume } from "../validators"
import { useTableColumnVisibilityStore } from "../store/useTableColumnVisibilityStore"
import { safeJSONParse } from "../utils"

export default function AppLayout() {
    /* ---------- Local States ---------- */
    const [isLoading, setIsLoading] = useState(true);

    /* ---------- Stores ---------- */
    const { leftSidebar, setLeftSidebar, setLibrary, setRightSidebar, setIsMiniPlayerWindowOpen, setSystemVolume, setOpenedFolder } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { setAlbumTableColumns, setPlaylistTableColumns, setTableView } = useTableColumnVisibilityStore();

    /* ---------- Custom Hooks ---------- */
    const { isLoading: isFetchingCurrentUser } = useCheckAuth();
    const { breakPoint } = useBreakPoint();

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        /* Left Sidebar */
        const rawLeftSidebar = localStorage.getItem(LEFT_SIDEBAR_KEY) || "{}";
        const fallbackLeftSidebar = {
            panelSize: 22,
            isExpanded: false
        }
        let leftSidebar = safeJSONParse(rawLeftSidebar, fallbackLeftSidebar);
        const isValidLeftSidebar = validateLeftSidebar(leftSidebar);

        if (!isValidLeftSidebar) {
            leftSidebar = fallbackLeftSidebar;
        }

        setLeftSidebar(leftSidebar);

        /* Library */
        const rawLibrary = localStorage.getItem(LIBRARY_KEY) || "{}";
        const fallbackLibrary = {
            activeTab: "Playlists",
            sort: "Recently Added",
            view: "Default List",
        }
        let library = safeJSONParse(rawLibrary, fallbackLibrary);
        const isValidLibrary = validateLibrary(library);

        if (!isValidLibrary) {
            library = fallbackLibrary;
        }

        setLibrary(library);

        /* Right Sidebar */
        const rawRightSidebar = localStorage.getItem(RIGHT_SIDEBAR_KEY) || "{}";
        const fallbackRightSidebar = {
            panelSize: 20,
            showNowPlayingView: false,
            showQueueView: false,
            isNowPlayingViewExpanded: false,
            isNowPlayingViewFullScreen: false
        }
        let rightSidebar = safeJSONParse(rawRightSidebar, fallbackRightSidebar);
        const isValidRightSidebar = validateRightSidebar(rightSidebar);

        if (!isValidRightSidebar) {
            rightSidebar = fallbackRightSidebar;
        }

        setRightSidebar(rightSidebar);

        /* Mini Player Window */
        let rawIsMiniPlayerWindowOpen = localStorage.getItem(MINI_PLAYER_WINDOW_OPEN_KEY) || "false";
        let isMiniPlayerWindowOpen = safeJSONParse(rawIsMiniPlayerWindowOpen, false);

        setIsMiniPlayerWindowOpen(isMiniPlayerWindowOpen);

        /* System Volume */
        let rawSystemVolume = localStorage.getItem(SYSTEM_VOLUME_KEY) || "[100]";
        const fallbackSystemVolume = [100];
        let systemVolume = safeJSONParse(rawSystemVolume, fallbackSystemVolume);

        let isValidSystemVolume = validateSystemVolume(systemVolume);

        if (!isValidSystemVolume) {
            systemVolume = fallbackSystemVolume;
        }

        setSystemVolume(systemVolume);

        /* Opened Folder */
        const rawOpenedFolder = localStorage.getItem(OPENED_FOLDER_KEY) || "{}";
        const fallbackOpenedFolder = {
            id: "",
            name: ""
        }
        let openedFolder = safeJSONParse(rawOpenedFolder, fallbackOpenedFolder);
        const isValidOpenedFolder = validateOpenedFolder(openedFolder);

        if (!isValidOpenedFolder) {
            openedFolder = fallbackOpenedFolder;
        }

        setOpenedFolder(openedFolder);

        /* Table Columns */
        const tableView =
            localStorage.getItem(TABLE_VIEW_KEY) === "Compact List"
                ? "Compact List"
                : "Default List";

        const rawTableColumns = localStorage.getItem(TABLE_COLUMNS_CONFIG_KEY) || "{}";
        const fallbackTableColumns = {
            albumTableColumns: {
                INDEX: { visible: true },
                TITLE: { visible: true },
                ARTIST: { visible: true },
                DURATION: { visible: true }
            },

            playlistTableColumns: {
                INDEX: { visible: true },
                TITLE: { visible: true },
                ARTIST: { visible: true },
                ALBUM: { visible: true },
                "DATE ADDED": { visible: true },
                DURATION: { visible: true }
            },
        }
        const tableColumns = safeJSONParse(rawTableColumns, fallbackTableColumns);

        let albumTableColumns = tableColumns?.albumTableColumns;
        const isValidAlbumTableColumns = validateAlbumTableColumns(albumTableColumns);

        if (!isValidAlbumTableColumns) {
            if (tableView == "Compact List") {
                albumTableColumns = fallbackTableColumns.albumTableColumns;
            } else {
                albumTableColumns = {
                    ...fallbackTableColumns.albumTableColumns,
                    ARTIST: { visible: false },
                }
            }
        }

        let playlistTableColumns = tableColumns?.playlistTableColumns;
        const isValidPlaylistTableColumns = validatePlaylistTableColumns(playlistTableColumns);

        if (!isValidPlaylistTableColumns) {
            if (tableView == "Compact List") {
                playlistTableColumns = fallbackTableColumns.playlistTableColumns;
            } else {
                playlistTableColumns = {
                    ...fallbackTableColumns.playlistTableColumns,
                    ARTIST: { visible: false },
                    "DATE ADDED": { visible: true },
                }
            }
        }

        setTableView(tableView as TableView);
        setAlbumTableColumns(albumTableColumns);
        setPlaylistTableColumns(playlistTableColumns);
    }, [])

    useEffect(() => {
        if (breakPoint == "md") {
            if (leftPanelSize >= 22 && leftPanelSize <= 32) {
                setLeftSidebar({ panelSize: 32 });
            }

            if (leftPanelSize >= 7 && leftPanelSize <= 10) {
                setLeftSidebar({ panelSize: 32 })
            }
        }
    }, [breakPoint])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [])

    if (isLoading || isFetchingCurrentUser) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#000000]">
                <div className="text-[#3BE477]">
                    <LogoIcon width="80" height="80" />
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-[#121212]">
            {
                breakPoint == "sm" ? (
                    <MobileLayout />
                ) : (
                    <DesktopLayout />
                )
            }
        </div>
    )
}
