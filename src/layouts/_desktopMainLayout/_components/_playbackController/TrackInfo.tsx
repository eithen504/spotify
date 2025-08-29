import PlaybackMusicPlaceholder from "../../../../components/ui/placeholders/PlaybackMusicPlaceholder";
import useBreakPoint from "../../../../hooks/useBreakPoint";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { AddIcon, DownArrowIcon, UpArrowIcon } from "../../../../Svgs"

const TrackInfo = () => {
    const { preferences: { showNowPlayingView, isNowPlayingViewExpanded }, setPreferences } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const [breakpoint] = useBreakPoint()

    const handleToggleShowNowPlayingView = () => {
        if (breakpoint == "lg") {
            if (isNowPlayingViewExpanded) {
                setPreferences({ isNowPlayingViewExpanded: false })
                localStorage.setItem("isNowPlayingViewExpanded", "false")
                return;
            }
            if (showNowPlayingView) {
                setPreferences({ showNowPlayingView: false })
                localStorage.setItem("showNowPlayingView", "false")
            } else {
                setPreferences({ showNowPlayingView: true, showQueueView: false })
                localStorage.setItem("showNowPlayingView", "true")
                localStorage.setItem("showQueueView", "false")
            }
        }

        if (breakpoint == "md") {
            if (isNowPlayingViewExpanded) {
                setPreferences({ isNowPlayingViewExpanded: false })
                localStorage.setItem("isNowPlayingViewExpanded", "false")
            } else {
                setPreferences({ isNowPlayingViewExpanded: true })
                localStorage.setItem("isNowPlayingViewExpanded", "true")
            }
        }
    }

    const getSuggestedToolTip = () => {
        if (breakpoint == "lg") {
            if (isNowPlayingViewExpanded) {
                return "Minimize Now Playing View";
            }
            if (showNowPlayingView) {
                return "Hide Now Playing View";
            } else {
                return "Show Now Playing View";
            }
        }

        if (breakpoint == "md") {
            if (isNowPlayingViewExpanded) {
                return "Minimize Now Playing View";
            } else {
                return "Expand Now Playing View";
            }
        }
    }

    const getSuggestedIcon = () => {
        if (breakpoint == "lg") {
            if (isNowPlayingViewExpanded) {
                return <DownArrowIcon width="18" height="18" />;
            }
            if (showNowPlayingView) {
                return <DownArrowIcon width="18" height="18" />;
            } else {
                return <UpArrowIcon width="18" height="18" />;
            }
        }

        if (breakpoint == "md") {
            if (isNowPlayingViewExpanded) {
                return <DownArrowIcon width="18" height="18" />;

            } else {
                return <UpArrowIcon width="18" height="18" />;
            }
        }

        return <DownArrowIcon width="18" height="18" />;
    }

    return (
        <div className="flex items-center space-x-3 w-1/4 relative">
            <div className="relative group">
                {
                    trackDetails.coverImageUrl ? (
                        <img
                            src={trackDetails.coverImageUrl}
                            alt={trackDetails.title}
                            className="w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded object-cover transition-opacity"
                        />
                    ) : trackDetails._id ? (
                        <PlaybackMusicPlaceholder shouldShowPlaceholderIcon={true} />
                    ) : (
                        <PlaybackMusicPlaceholder shouldShowPlaceholderIcon={false} />
                    )
                }

                <button className={`absolute cursor-pointer text-[#b3b3b3] dynamic-text-hover bg-black/60 rounded-full top-0 right-0 group-hover-opacity transition-opacity p-1`}
                    onClick={handleToggleShowNowPlayingView}
                    title={getSuggestedToolTip()}
                >
                    {getSuggestedIcon()}
                </button>
            </div>

            <div className="overflow-hidden">
                <p className="text-[#ffffff] text-sm font-medium truncate hover:underline cursor-pointer">
                    {trackDetails.title}
                </p>

                <p className="text-[#99a1af] text-xs truncate">{trackDetails.artist}</p>
            </div>

            <button className={`text-[#b3b3b3] dynamic-text-hover cursor-pointer`}>
                <AddIcon width="17" height="17" />
            </button>
        </div>
    )
}

export default TrackInfo