import { useEffect, useState } from "react"
import { useBreakPoint } from "../hooks/breakPoint"
import DesktopLayout from "./desktopLayout/DesktopLayout"
import MobileLayout from "./mobileLayout/MobileLayout"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore"
import type { LeftSidebarTab, Sort, View } from "../types"
import { LEFT_SIDEBAR_TABS, SORT_OPTIONS, VIEW_COMPONENTS } from "../constants"
import { useCheckAuth } from "../hooks/auth"
import { LogoIcon } from "../Svgs"

export default function AppLayout() {
    const { breakPoint } = useBreakPoint()
    const { preferences: { leftPanelSize }, setPreferences } = useUIPreferencesStore();
    const { isLoading: isFetchingCurrentUser } = useCheckAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let leftPanelSize = Number(localStorage.getItem("leftPanelSize")) || 22
        if (leftPanelSize > 38) {
            leftPanelSize = 22
            localStorage.setItem("leftPanelSize", `${leftPanelSize}`)
        }

        let rightPanelSize = Number(localStorage.getItem("rightPanelSize")) || 20
        if (rightPanelSize > 25) {
            rightPanelSize = 20
            localStorage.setItem("rightPanelSize", `${rightPanelSize}`)
        }

        const showNowPlayingView = localStorage.getItem("showNowPlayingView") || "false"
        const showQueueView = localStorage.getItem("showQueueView") || "false"

        let sort = localStorage.getItem("sort") || "Recently Added"
        if (!SORT_OPTIONS[sort as Sort]) {
            sort = "Recently Added"
            localStorage.setItem("sort", sort)
        }

        let view = localStorage.getItem("view") || "Default List"
        if (!VIEW_COMPONENTS[view as View]) {
            view = "Default List"
            localStorage.setItem("view", view)
        }

        let volume = Number(localStorage.getItem("systemVolume")) || 100
        if (volume > 100 || volume < 0) {
            volume = 100
            localStorage.setItem("volume", `${volume}`)
        }

        let leftSidebarActiveTab = localStorage.getItem("leftSidebarActiveTab") || "Playlists"
        if (!LEFT_SIDEBAR_TABS.find((item) => item == leftSidebarActiveTab)) {
            leftSidebarActiveTab = "Playlists"
            localStorage.setItem("leftSidebarActiveTab", leftSidebarActiveTab)
        }

        const folder = JSON.parse(localStorage.getItem("folder") || "{}");

        setPreferences({
            leftPanelSize,
            rightPanelSize,
            showNowPlayingView: showNowPlayingView == "true",
            showQueueView: showQueueView == "true",
            sort: sort as Sort,
            view: view as View,
            systemVolume: [volume],
            leftSidebarActiveTab: leftSidebarActiveTab as LeftSidebarTab,
            folder: folder
        })
    }, [])

    useEffect(() => {
        if (breakPoint == "md") {
            if (leftPanelSize >= 22 && leftPanelSize <= 32) {
                setPreferences({ leftPanelSize: 32 })
                localStorage.setItem("leftPanelSize", "32")
            }

            if (leftPanelSize >= 7 && leftPanelSize <= 10) {
                setPreferences({ leftPanelSize: 10 })
                localStorage.setItem("leftPanelSize", "10")
            }
        }
    }, [breakPoint])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
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
