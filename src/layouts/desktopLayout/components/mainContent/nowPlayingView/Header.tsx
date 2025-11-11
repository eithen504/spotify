import { useRef, useState } from "react";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import { ExpandIcon, MoreIcon, UnCollapsedIcon } from "../../../../../Svgs"
import type { MenuOptions } from "../../../../../types";
import EntityOptionsMenu from "../../../../../components/EntityOptionsMenu";

interface HeaderProps {
    isScrolled: boolean;
    trackMenuOptions: MenuOptions;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, trackMenuOptions }) => {
    /* ---------- Local States ---------- */
    const [isTrackMenuOpen, setIsTrackMenuOpen] = useState(false);

    /* ---------- Local References ---------- */
    const trackMenuRef = useRef<HTMLDivElement>(null);

    /* ---------- Stores ---------- */
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { rightSidebar } = preferences;
    const { trackDetails } = useTrackDetailsStore();

    /* ---------- Methods Or Functions ---------- */
    const handleHidedNowPlayingView = () => {
        const updatedRightSidebar = { ...rightSidebar, showNowPlayingView: false };
        const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
        setPreferences({ rightSidebar: updatedRightSidebar });
        localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
    }

    const handleExpandNowPlayingView = () => {
        const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: true };
        const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
        setPreferences({ rightSidebar: updatedRightSidebar });
        localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
    }

    return (
        <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 bg-[#121212] z-90`}>
            {/* Title and collapse button */}
            <div className="flex gap-2 items-center max-w-[150px] overflow-hidden">
                <button
                    className={`${trackDetails._id ? "cursor-pointer" : ""} text-[#8f8f8f] dynamic-text-hover transform group-hover-translate-x-0 group-hover-opacity transition duration-400 ease-out`}
                    style={{
                        '--hoverOpacity': 1
                    } as React.CSSProperties}
                    title={trackDetails._id ? "Hide Now Playing View" : ""}
                    onClick={handleHidedNowPlayingView}
                    disabled={!trackDetails._id}
                >
                    <UnCollapsedIcon width="20" height="20" />
                </button>

                <p className={`text-md font-bold text-[#ffffff] -ml-7 group-hover-ml-0 transition-all duration-400 truncate`}>
                    Now Playing
                </p>
            </div>

            {/* Right side - Action buttons */}
            <div
                className={`flex items-center space-x-2 group-hover-opacity transition-all duration-400 ease-out`}
            >
                <div
                    ref={trackMenuRef}
                    className="relative flex items-center"
                >
                    <button
                        className={`${trackDetails._id ? "cursor-pointer" : ""} text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover p-[6px] rounded-full transition-colors`}
                        style={{
                            '--bgHoverColor': '#1E1E1E',
                        } as React.CSSProperties}
                        title={trackDetails._id ? `More Options For ${trackDetails.title}` : ""}
                        onClick={() => setIsTrackMenuOpen(true)}
                        disabled={!trackDetails._id}
                    >
                        <MoreIcon width="20" height="20" />
                    </button>

                    {isTrackMenuOpen && (
                        <EntityOptionsMenu
                            options={trackMenuOptions || []}
                            entityMenuRef={trackMenuRef}
                            subMenuleftShift={true}
                            rightPosition="60px"
                            onClose={() => setIsTrackMenuOpen(false)}
                        />
                    )}
                </div>

                <button
                    className={`${trackDetails._id ? "cursor-pointer" : ""} text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover p-[8px] rounded-full transition-colors`}
                    style={{
                        '--bgHoverColor': '#1E1E1E',
                    } as React.CSSProperties}
                    title={trackDetails._id ? "Expand Now Playing View" : ""}
                    onClick={handleExpandNowPlayingView}
                    disabled={!trackDetails._id}
                >
                    <ExpandIcon width="16" height="16" />
                </button>
            </div>
        </div>
    )
}

export default Header