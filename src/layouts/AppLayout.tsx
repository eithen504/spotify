import { useEffect } from "react";
import useBreakPoint from "../hooks/useBreakPoint"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import DesktopMainLayout from "./_desktopMainLayout/DesktopMainLayout";
import MobileMainLayout from "./_mobileMainLayout/MobileMainLayout";
import type { LeftSidebarViewLabel } from "../Types";
import { VIEW_COMPONENTS } from "../Constants";
import { useScrollStore } from "../store/useScrollStore";

export default function AppLayout() {
    const [breakpoint] = useBreakPoint();
    const { setPreferences } = useUIPreferencesStore();
    const {setIsScrolled} = useScrollStore();

    useEffect(() => {
        let leftPanelSize = Number(localStorage.getItem("leftPanelSize")) || 22
        let rightPanelSize = Number(localStorage.getItem("rightPanelSize")) || 20
        const isLeftSidebarExpanded = localStorage.getItem("isLeftSidebarExpanded") == "true"
        const showNowPlayingView = localStorage.getItem("showNowPlayingView") == "true"
        const localView = localStorage.getItem("view") || "Default List"
        const view = VIEW_COMPONENTS[localView as LeftSidebarViewLabel] ? localView : "Default List"

        rightPanelSize = (rightPanelSize >= 20 && rightPanelSize <= 25) ? rightPanelSize : 20

        localStorage.setItem("rightPanelSize", `${rightPanelSize}`)
        localStorage.setItem("view", `${view}`)

        if (breakpoint == "lg") {
            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView, view: view as LeftSidebarViewLabel })
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

            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView, view: view as LeftSidebarViewLabel })
            localStorage.setItem("leftPanelSize", `${leftPanelSize}`)
        }
    }, [breakpoint])

    useEffect(() => {
        setIsScrolled(false)
    }, [breakpoint])

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
