import useBreakPoint from "../../../../../hooks/useBreakPoint";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import { CollapsedIcon, ExpandIcon, LibraryIcon, MinimizeIcon, PlusIcon, UnCollapsedIcon } from "../../../../../Svgs"

const Header = () => {
    const { preferences: { leftPanelSize, isLeftSidebarExpanded }, setPreferences } = useUIPreferencesStore();
    const [breakpoint] = useBreakPoint();

    const handleCollapsedLibrary = () => {
        if (breakpoint == "lg") {
            setPreferences({ leftPanelSize: 7 })
            localStorage.setItem("leftPanelSize", "7")
        }

        if (breakpoint == "md") {
            setPreferences({ leftPanelSize: 10 })
            localStorage.setItem("leftPanelSize", "10")
        }
    }

    const handleOpenLibrary = () => {
        if (breakpoint == "lg") {
            setPreferences({ leftPanelSize: 22 })
            localStorage.setItem("leftPanelSize", "22")
        }

        if (breakpoint == "md") {
            setPreferences({ leftPanelSize: 32 })
            localStorage.setItem("leftPanelSize", "32")
        }
    }

    const handleToggleExpandLibrary = () => {
        if (isLeftSidebarExpanded) {
            if (breakpoint == "lg") {
                setPreferences({ leftPanelSize: 22 })
                localStorage.setItem("leftPanelSize", "22")
            }

            if (breakpoint == "md") {
                setPreferences({ leftPanelSize: 32 })
                localStorage.setItem("leftPanelSize", "32")
            }
            setPreferences({ isLeftSidebarExpanded: false })
            localStorage.setItem("isLeftSidebarExpanded", "false")
        } else {
            setPreferences({ leftPanelSize: 100 })
            localStorage.setItem("leftPanelSize", `${100}`)
            setPreferences({ isLeftSidebarExpanded: true })
            localStorage.setItem("isLeftSidebarExpanded", "true")
        }
    }

    return (
        <div className="flex items-center justify-between mb-1 px-5 py-3">
            {
                leftPanelSize >= 22 ? (
                    <>
                        <div className="flex gap-2 items-center max-w-[150px] overflow-hidden">
                            {
                                !isLeftSidebarExpanded && (
                                    <button
                                        className="text-[#8f8f8f] dynamic-text-hover cursor-pointer transform group-hover-translate-x-0 group-hover-opacity transition duration-400 ease-out"
                                        style={{
                                            '--textHoverColor': '#ffffff',
                                            '--hoverOpacity': 1
                                        } as React.CSSProperties}
                                        
                                        title="Collapse Your library"
                                        onClick={handleCollapsedLibrary}
                                    >
                                        <CollapsedIcon width="17" height="17" />
                                    </button>
                                )
                            }

                            <p className={`text-md font-bold text-[#ffffff] ${isLeftSidebarExpanded ? "ml-0": "-ml-[25px] group-hover-ml-0"} transition-all duration-400 truncate`}>
                                Your Library
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                className="p-[10px] rounded-full text-[#8f8f8f] dynamic-text-hover bg-[#1f1f1f] dynamic-bg-hover flex items-center justify-center transition cursor-pointer"
                                style={{
                                    '--textHoverColor': '#ffffff',
                                    '--bgHoverColor': '#282828'
                                } as React.CSSProperties}
                            >
                                <PlusIcon width="16" height="16" />
                            </button>
                            <button
                                className="p-[9.5px] rounded-full text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover flex items-center justify-center transition cursor-pointer"
                                style={{
                                    '--textHoverColor': '#ffffff',
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
                        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                            <button
                                className="text-[#8f8f8f] dynamic-text-hover transition mt-[6px] cursor-pointer group/button"
                                style={{
                                    '--textHoverColor': '#ffffff',
                                } as React.CSSProperties}
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

                            <button
                                className="text-[#8f8f8f] dynamic-text-hover bg-[#1f1f1f] dynamic-bg-hover transition p-[10px] rounded-full cursor-pointer"
                                style={{
                                    '--textHoverColor': '#ffffff',
                                    '--bgHoverColor': '#282828'
                                } as React.CSSProperties}
                            >
                                <PlusIcon width="16" height="16" />
                            </button>
                        </div>

                    </>
                )
            }

        </div>
    )
}

export default Header