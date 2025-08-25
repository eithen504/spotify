import { useEffect, useState } from "react";
import useBreakPoint from "../hooks/useBreakPoint"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import DesktopMainLayout from "./_desktopMainLayout/DesktopMainLayout";
import MobileMainLayout from "./_mobileMainLayout/MobileMainLayout";
import type { LeftSidebarViewLabel } from "../Types";
import { LEFT_SIDEBAR_VIEW_COMPONENTS } from "../Constants";
import { useCheckAuth } from "../hooks/auth";
import { LogoIcon } from "../Svgs";

export default function AppLayout() {
    const [breakpoint] = useBreakPoint();
    const [isLoading, setIsLoading] = useState(true);
    const { setPreferences } = useUIPreferencesStore();
    const { isLoading: isFetchingCurrentUser } = useCheckAuth();

    useEffect(() => {
        let leftPanelSize = Number(localStorage.getItem("leftPanelSize")) || 22
        let rightPanelSize = Number(localStorage.getItem("rightPanelSize")) || 20
        const isLeftSidebarExpanded = localStorage.getItem("isLeftSidebarExpanded") == "true"
        const showNowPlayingView = localStorage.getItem("showNowPlayingView") == "true"
        const showQueueView = localStorage.getItem("showQueueView") == "true"
        const localView = localStorage.getItem("view") || "Default List"
        const view = LEFT_SIDEBAR_VIEW_COMPONENTS[localView as LeftSidebarViewLabel] ? localView : "Default List"

        rightPanelSize = (rightPanelSize >= 20 && rightPanelSize <= 25) ? rightPanelSize : 20

        localStorage.setItem("rightPanelSize", `${rightPanelSize}`)
        localStorage.setItem("view", `${view}`)

        if (breakpoint == "lg") {
            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView, showQueueView, view: view as LeftSidebarViewLabel })
        }

        if (breakpoint == "md") {
            if (leftPanelSize >= 7 && leftPanelSize <= 10) {
                leftPanelSize = 10;
            }

            if (leftPanelSize >= 22 && leftPanelSize <= 32) {
                leftPanelSize = 32
            }

            if (isLeftSidebarExpanded) {
                leftPanelSize = 100;
            }

            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView, showQueueView, view: view as LeftSidebarViewLabel })
            localStorage.setItem("leftPanelSize", `${leftPanelSize}`)
        }
    }, [breakpoint])

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
                breakpoint == "sm" ? (
                    <MobileMainLayout />
                ) : (
                    <DesktopMainLayout />
                )
            }
        </div>
    )
}
