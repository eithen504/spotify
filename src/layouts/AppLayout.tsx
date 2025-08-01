import { useEffect } from "react";
import useBreakPoint from "../hooks/useBreakPoint"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import DesktopMainLayout from "./_desktopMainLayout/DesktopMainLayout";
import MobileMainLayout from "./_mobileMainLayout/MobileMainLayout";

export default function AppLayout() {
    const [breakpoint] = useBreakPoint();
    const { setPreferences } = useUIPreferencesStore();

    useEffect(() => {
        let leftPanelSize = Number(localStorage.getItem("leftPanelSize")) || 22
        let rightPanelSize = Number(localStorage.getItem("rightPanelSize")) || 20
        const isLeftSidebarExpanded = localStorage.getItem("isLeftSidebarExpanded") == "true"
        const showNowPlayingView = localStorage.getItem("showNowPlayingView") == "true"

        rightPanelSize = (rightPanelSize >= 20 && rightPanelSize <= 25) ? rightPanelSize : 20

        localStorage.setItem("rightPanelSize", `${rightPanelSize}`)

        if (breakpoint == "lg") {
            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView })
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

            setPreferences({ leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView })
            localStorage.setItem("leftPanelSize", `${leftPanelSize}`)
        }
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
