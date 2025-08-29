import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import { ExpandIcon, MoreIcon, UnCollapsedIcon } from "../../../../../Svgs"

interface HeaderProps {
    isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
    const {trackDetails} = useTrackDetailsStore();
    const { setPreferences } = useUIPreferencesStore();

    const handleHidedNowPlayingView = () => {
        setPreferences({ showNowPlayingView: false })
        localStorage.setItem("showNowPlayingView", "false")
    }

    const handleExpandNowPlayingView = () => {
        setPreferences({ isNowPlayingViewExpanded: true })
    }

    return (
        <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 bg-[#121212] z-5`}>
            {/* Title and collapse button */}
            <div className="flex gap-2 items-center max-w-[150px] overflow-hidden">
                <button
                    className={`text-[#8f8f8f] dynamic-text-hover cursor-pointer transform group-hover-translate-x-0 group-hover-opacity transition duration-400 ease-out`}
                    style={{
                        '--hoverOpacity': 1
                    } as React.CSSProperties}
                    onClick={handleHidedNowPlayingView}
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
                <button
                    className="text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover p-[6px] cursor-pointer rounded-full transition-colors"
                    style={{
                        '--bgHoverColor': '#1E1E1E',
                    } as React.CSSProperties}
                >
                    <MoreIcon width="20" height="20" />
                </button>

                <button
                    className="text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover p-[8px] cursor-pointer rounded-full transition-colors"
                    style={{
                        '--bgHoverColor': '#1E1E1E',
                    } as React.CSSProperties}
                    title={"Expand Now Playing View"}
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