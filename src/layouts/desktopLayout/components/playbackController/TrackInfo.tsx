import { Link } from "react-router-dom";
import { PlaybackMusicPlaceholder } from "../../../../components/Placeholders";
import { useBreakPoint } from "../../../../hooks/breakPoint";
import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { AddIcon, DownArrowIcon, SavedIcon, UpArrowIcon } from "../../../../Svgs"

const TrackInfo = () => {
    /* ---------- Stores ---------- */
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { rightSidebar } = preferences;
    const { showNowPlayingView, isNowPlayingViewExpanded } = rightSidebar;
    const { trackDetails } = useTrackDetailsStore();

    /* ---------- Custom Hooks ---------- */
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id });
    const { breakPoint } = useBreakPoint();
    const { mutateAsync: likeTrack } = useLikeTrack();

    /* ---------- Methods Or Functions ---------- */
    const handleToggleShowNowPlayingView = () => {
        if (breakPoint == "lg") {
            if (isNowPlayingViewExpanded) {
                const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: false };
                const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
                setPreferences({ rightSidebar: updatedRightSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
                return;
            }
            if (showNowPlayingView) {
                const updatedRightSidebar = { ...rightSidebar, showNowPlayingView: false };
                const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
                setPreferences({ rightSidebar: updatedRightSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
            } else {
                const updatedRightSidebar = { ...rightSidebar, showNowPlayingView: true, showQueueView: false };
                const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
                setPreferences({ rightSidebar: updatedRightSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
            }
        }

        if (breakPoint == "md") {
            if (isNowPlayingViewExpanded) {
                const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: false };
                const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
                setPreferences({ rightSidebar: updatedRightSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
            } else {
                const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: true };
                const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
                setPreferences({ rightSidebar: updatedRightSidebar });
                localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
            }
        }
    }

    const getSuggestedToolTip = () => {
        if (breakPoint == "lg") {
            if (isNowPlayingViewExpanded) {
                return "Minimize Now Playing View";
            }
            if (showNowPlayingView) {
                return "Hide Now Playing View";
            } else {
                return "Show Now Playing View";
            }
        }

        if (breakPoint == "md") {
            if (isNowPlayingViewExpanded) {
                return "Minimize Now Playing View";
            } else {
                return "Expand Now Playing View";
            }
        }
    }

    const getSuggestedIcon = () => {
        if (breakPoint == "lg") {
            if (isNowPlayingViewExpanded) {
                return <DownArrowIcon width="18" height="18" />;
            }
            if (showNowPlayingView) {
                return <DownArrowIcon width="18" height="18" />;
            } else {
                return <UpArrowIcon width="18" height="18" />;
            }
        }

        if (breakPoint == "md") {
            if (isNowPlayingViewExpanded) {
                return <DownArrowIcon width="18" height="18" />;

            } else {
                return <UpArrowIcon width="18" height="18" />;
            }
        }

        return <DownArrowIcon width="18" height="18" />;
    }

    const handleLikeUnlikeTrack = () => {
        likeTrack(trackDetails)
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

                <button className={`absolute rounded-full top-0 right-0 opacity-0 transition-opacity p-1 ${trackDetails._id ? "text-[#b3b3b3] dynamic-text-hover bg-black/60 group-hover-opacity cursor-pointer" : "hidden"}`}
                    onClick={handleToggleShowNowPlayingView}
                    title={getSuggestedToolTip()}
                >
                    {getSuggestedIcon()}
                </button>
            </div>

            <div className="overflow-hidden">
                <Link to={`/track/${trackDetails._id}`}>
                    <p className={`text-[#ffffff] text-sm font-medium truncate ${trackDetails._id ? "hover:underline cursor-pointer" : ""}`}>
                        {trackDetails.title || "No Track Selected"}
                    </p>
                </Link>

                <p className="text-[#99a1af] text-xs truncate">{trackDetails.artist}</p>
            </div>

            <button
                className={`text-[#b3b3b3] ${trackDetails._id ? "cursor-pointer dynamic-text-hover" : "cursor-not-allowed"}`}
                onClick={handleLikeUnlikeTrack}
                disabled={!trackDetails._id}
            >
                {
                    hasLiked ? <SavedIcon width="17" height="17" /> : <AddIcon width="17" height="17" />
                }
            </button>
        </div>
    )
}

export default TrackInfo