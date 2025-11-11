import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { AddIcon, PauseIcon, PlayIcon, SavedIcon } from "../../../../Svgs"

const RightControls = () => {
    /* ---------- Stores ---------- */
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();

    /* ---------- Custom Hooks ---------- */
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id });
    const { mutateAsync: likeTrack } = useLikeTrack();

    return (
        <div className="flex items-center space-x-6 text-[#ffffff]">
            <button
                aria-label="Favorite"
                className="text-white/70 dynamic-text-hover cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    likeTrack(trackDetails);
                }}
            >
                {
                    hasLiked ? <SavedIcon /> : <AddIcon />
                }
            </button>
            <button aria-label="Play" className="cursor-pointer text-[#ffffff]"
                onClick={(e) => {
                    e.stopPropagation();
                    setTrackDetails({ isPlaying: !trackDetails.isPlaying })
                }}
            >
                {
                    trackDetails.isPlaying ? <PauseIcon width="22" height="22" /> : <PlayIcon width="22" height="22" />
                }
            </button>
        </div>
    )
}

export default RightControls