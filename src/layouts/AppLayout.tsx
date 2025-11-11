import { useEffect, useState } from "react"
import { useBreakPoint } from "../hooks/breakPoint"
import DesktopLayout from "./desktopLayout/DesktopLayout"
import MobileLayout from "./mobileLayout/MobileLayout"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore"
import type { LeftSidebarTab, LibrarySort, LibraryView } from "../types"
import { LEFT_SIDEBAR_TABS_MAP, SORT_OPTIONS_MAP, VIEW_COMPONENTS } from "../constants"
import { useCheckAuth } from "../hooks/auth"
import { LogoIcon } from "../Svgs"

//   leftPanelSize: number;
//   rightPanelSize: number;
//   isLeftSidebarExpanded: boolean;
//   showNowPlayingView: boolean;
//   showQueueView: boolean;
//   isNowPlayingViewExpanded: boolean;
//   isNowPlayingViewFullScreen: boolean;
//   isMiniPlayerWindowOpen: boolean;
//   sort: Sort;
//   view: View;
//   systemVolume: number[];
//   leftSidebarActiveTab: LeftSidebarTab;
//   folder: FolderInfo;

export default function AppLayout() {
    /* ---------- Local States ---------- */
    const [isLoading, setIsLoading] = useState(true);

    /* ---------- Stores ---------- */
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { leftSidebar } = preferences;
    const { panelSize: leftPanelSize } = leftSidebar;

    /* ---------- Custom Hooks ---------- */
    const { isLoading: isFetchingCurrentUser } = useCheckAuth();
    const { breakPoint } = useBreakPoint();

    /* ---------- UseEffects ---------- */
    // useEffect(() => {
    //     /*

    //     */
    //     let leftPanelSize = Number(localStorage.getItem("leftPanelSize")) || 22;
    //     if (leftPanelSize > 38) {
    //         leftPanelSize = 22;
    //         localStorage.setItem("leftPanelSize", `${leftPanelSize}`);
    //     } 

    //     let rightPanelSize = Number(localStorage.getItem("rightPanelSize")) || 20;
    //     if (rightPanelSize > 25) {
    //         rightPanelSize = 20;
    //         localStorage.setItem("rightPanelSize", `${rightPanelSize}`);
    //     }

    //     const showNowPlayingView = localStorage.getItem("showNowPlayingView") || "false";
    //     const showQueueView = localStorage.getItem("showQueueView") || "false";

    //     let sort = localStorage.getItem("sort") || "Recently Added";
    //     if (!SORT_OPTIONS_MAP[sort as Sort]) {
    //         sort = "Recently Added";
    //         localStorage.setItem("sort", sort);
    //     }

    //     let view = localStorage.getItem("view") || "Default List";
    //     if (!VIEW_COMPONENTS[view as View]) {
    //         view = "Default List";
    //         localStorage.setItem("view", view);
    //     }

    //     let volume = Number(localStorage.getItem("systemVolume")) || 100;
    //     if (volume > 100 || volume < 0) {
    //         volume = 100;
    //         localStorage.setItem("volume", `${volume}`);
    //     }

    //     let leftSidebarActiveTab = localStorage.getItem("leftSidebarActiveTab") || "Playlists";
    //     if (!LEFT_SIDEBAR_TABS.find((item) => item == leftSidebarActiveTab)) {
    //         leftSidebarActiveTab = "Playlists";
    //         localStorage.setItem("leftSidebarActiveTab", leftSidebarActiveTab);
    //     }

    //     const activeFolder = JSON.parse(localStorage.getItem("folder") || "{}");

    //     setPreferences({

    //     });

    //     // setPreferences({
    //     //     leftPanelSize,
    //     //     rightPanelSize,
    //     //     showNowPlayingView: showNowPlayingView == "true",
    //     //     showQueueView: showQueueView == "true",
    //     //     sort: sort as Sort,
    //     //     view: view as View,
    //     //     systemVolume: [volume],
    //     //     leftSidebarActiveTab: leftSidebarActiveTab as LeftSidebarTab,
    //     //     folder: folder
    //     // });
    // }, [])

    useEffect(() => {
        /*
 preferences: {
    leftSidebar: {
      panelSize: 22,
      isExpanded: false,
    },
    library: {
      activeTab: "Playlists",
      sort: "Recently Added",
      view: "Default List",
    },
    rightSidebar: {
      panelSize: 20,
      showNowPlayingView: false,
      showQueueView: false,
      isNowPlayingViewExpanded: false,
      isNowPlayingViewFullScreen: false,
    },
    isMiniPlayerWindowOpen: false,
    systemVolume: [100],
    activeFolder: {
      id: "",
      name: ""
    }
  },
        */
        let preferences = JSON.parse(localStorage.getItem("preferences") || "{}");

        // Left Sidebar
        let leftSidebar = preferences?.leftSidebar;

        let leftPanelSize = leftSidebar?.panelSize || 22;
        if (leftPanelSize > 38) {
            leftPanelSize = 22;
        }

        // Library
        const library = preferences?.library;
        let libraryActiveTab = library?.activeTab || "Playlists";
        if (!LEFT_SIDEBAR_TABS_MAP[libraryActiveTab as LeftSidebarTab]) {
            libraryActiveTab = "Playlists";
        }

        let librarySort = library?.sort || "Recently Added";
        if (!SORT_OPTIONS_MAP[librarySort as LibrarySort]) {
            librarySort = "Recently Added";
        }

        let libraryView = library?.view || "Default List";
        if (!VIEW_COMPONENTS[libraryView as LibraryView]) {
            libraryView = "Default List";
        }

        // Right Sidebar
        let rightSidebar = preferences?.rightSidebar;

        let rightPanelSize = rightSidebar?.panelSize || 20;
        if (rightPanelSize > 25) {
            rightPanelSize = 20;
        }

        let showNowPlayingView = rightSidebar?.showNowPlayingView;

        let showQueueView = rightSidebar?.showQueueView;

        // System Volume
        let systemVolume = preferences?.systemVolume || 100;
        if (systemVolume > 100 || systemVolume < 0) {
            systemVolume = 100;
        }

        // Active Folder
        let activeFolder = preferences?.activeFolder;
        let activeFolderId = activeFolder?.id || "";
        let activeFolderName = activeFolder?.name || "";

        preferences = {
            leftSidebar: {
                panelSize: leftPanelSize,
                isExpanded: false,
            },
            library: {
                activeTab: libraryActiveTab,
                sort: librarySort,
                view: libraryView
            },
            rightSidebar: {
                panelSize: rightPanelSize,
                showNowPlayingView,
                showQueueView,
                isNowPlayingViewExpanded: false,
                isNowPlayingViewFullScreen: false
            },
            isMiniPlayerWindowOpen: false,
            systemVolume: [systemVolume],
            activeFolder: {
                id: activeFolderId,
                name: activeFolderName
            }
        }

        setPreferences(preferences);
        localStorage.setItem("preferences", JSON.stringify(preferences));

        // setPreferences({
        //     leftPanelSize,
        //     rightPanelSize,
        //     showNowPlayingView: showNowPlayingView == "true",
        //     showQueueView: showQueueView == "true",
        //     sort: sort as Sort,
        //     view: view as View,
        //     systemVolume: [volume],
        //     leftSidebarActiveTab: leftSidebarActiveTab as LeftSidebarTab,
        //     folder: folder
        // });
    }, [])

    console.log("sho", preferences);

    useEffect(() => {
        if (breakPoint == "md") {
            if (leftPanelSize >= 22 && leftPanelSize <= 32) {
                const updatedLeftSidebar = { ...leftSidebar, panelSize: 32 };
                const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
                setPreferences({ leftSidebar: updatedLeftSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
            }

            if (leftPanelSize >= 7 && leftPanelSize <= 10) {
                const updatedLeftSidebar = { ...leftSidebar, panelSize: 10 };
                const updatedPreferences = { ...preferences, leftSidebar: updatedLeftSidebar };
                setPreferences({ leftSidebar: updatedLeftSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
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
