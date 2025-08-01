import useBreakPoint from "../../../../hooks/useBreakPoint";
import useIsTouchScreen from "../../../../hooks/useIsTouchScreen";
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { AddIcon, DownArrowIcon, UpArrowIcon } from "../../../../Svgs"

const TrackInfo = () => {
    const { preferences: { showNowPlayingView, isNowPlayingViewExpanded }, setPreferences } = useUIPreferencesStore();
    const [breakpoint] = useBreakPoint()
    const isTouchScreen = useIsTouchScreen();

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
                setPreferences({ showNowPlayingView: true })
                localStorage.setItem("showNowPlayingView", "true")
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
                <img
                    src={'https://i.scdn.co/image/ab67616d000048513899712512f50a8d9e01e951'}
                    alt={'trackDetails.title'}
                    className={`w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded object-cover ${isTouchScreen ? "group-active:opacity-70" : "group-hover:opacity-70"} transition-opacity`}
                />

                <button className={`absolute cursor-pointer text-gray-400 hover:text-white bg-black/60 rounded-full top-0 right-0 opacity-0 ${isTouchScreen ? "group-active:opacity-100" : "group-hover:opacity-100"} transition-opacity p-1`}
                    onClick={handleToggleShowNowPlayingView}
                    title={getSuggestedToolTip()}
                >
                    {getSuggestedIcon()}
                </button>
            </div>

            <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
                    {'trackDetails.title'}
                </p>

                <p className="text-gray-400 text-xs truncate">{'trackDetails.artist'}</p>
            </div>

            <button className={`text-gray-400 hover:text-white cursor-pointer`}>
                <AddIcon width="17" height="17" />
            </button>
        </div>
    )
}

export default TrackInfo