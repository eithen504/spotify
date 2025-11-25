import { useNavigate } from 'react-router-dom';
import { NowPlayingViewMusicPlaceholder } from '../../../../../components/Placeholders';
import { useLikeTrack, useTrackLikeStatus } from '../../../../../hooks/like';
import { useShare } from '../../../../../hooks/share';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import { AddIcon, SavedIcon, ShareIcon } from '../../../../../Svgs'

const TrackInfo = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();

    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();

    /* ---------- Custom Hooks ---------- */
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id });
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();

    return (
        <div>
            <div
                className="cursor-pointer"
                onClick={() => navigate(`/track/${trackDetails._id}`)}
            >
                {
                    trackDetails.coverImageUrl ? (
                        <img
                            src={trackDetails.coverImageUrl}
                            alt="Play Date"
                            className="rounded-[4px] w-full object-cover aspect-square"
                        />
                    ) : (
                        trackDetails._id ? (
                            <NowPlayingViewMusicPlaceholder shouldShowPlaceholderIcon={true} />
                        ) : (
                            <NowPlayingViewMusicPlaceholder shouldShowPlaceholderIcon={false} />
                        )
                    )
                }
            </div>
            <div className="mt-6 flex items-center justify-between">
                {/* Left: Title and Subtitle */}
                <div className="flex-1 min-w-0 pr-4">
                    <p
                        className="text-2xl font-bold truncate cursor-pointer hover:underline"
                        onClick={() => navigate(`/track/${trackDetails._id}`)}
                    >
                        {trackDetails.title || "No Track Selected"}
                    </p>
                    <p className="text-md text-[#aaaaaa] font-medium truncate">{trackDetails.artist}</p>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-4 text-xl text-[#8f8f8f] flex-shrink-0">
                    <button
                        className={`${trackDetails._id ? "cursor-pointer" : ""} dynamic-text-hover group-hover-opacity transition-all duration-400 ease-out`}
                        title={trackDetails._id ? `Share ${trackDetails.title}` : ""}
                        onClick={() => share(`/track/${trackDetails._id}`)}
                        disabled={!trackDetails._id}
                    >
                        <ShareIcon width="16" height="16" />
                    </button>
                    <button
                        className={`${trackDetails._id ? "dynamic-text-hover cursor-pointer" : "cursor-not-allowed"}`}
                        title={trackDetails._id ? (hasLiked ? `Remove ${trackDetails.title} From Liked Tracks` : `Add ${trackDetails.title} To Liked Tracks`) : ("")}
                        onClick={() => likeTrack(trackDetails)}
                        disabled={!trackDetails._id}
                    >
                        {
                            hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TrackInfo