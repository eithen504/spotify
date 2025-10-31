import { Link, useNavigate } from "react-router-dom";
import { PlaybackMusicPlaceholder } from "../../../../components/Placeholders";
import { useBreakPoint } from "../../../../hooks/breakPoint";
import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { AddIcon, DownArrowIcon, SavedIcon, UpArrowIcon } from "../../../../Svgs"

const TrackInfo = () => {
    const { preferences: { showNowPlayingView, isNowPlayingViewExpanded }, setPreferences } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const { breakPoint } = useBreakPoint()
    const { mutateAsync: likeTrack } = useLikeTrack()

    const navigate = useNavigate();

    const { getTrackLikeStatus } = useTrackLikeStatus()
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id })

    const handleToggleShowNowPlayingView = () => {
        if (breakPoint == "lg") {
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

        if (breakPoint == "md") {
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