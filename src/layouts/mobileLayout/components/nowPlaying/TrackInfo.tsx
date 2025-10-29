import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { AddIcon, SavedIcon } from "../../../../Svgs"

const TrackInfo = () => {
    const { trackDetails } = useTrackDetailsStore();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id })

    return (
        <div className="px-6 py-2 flex items-center justify-between flex-shrink-0 w-full mb-4">
            <div className="flex flex-col flex-grow min-w-0">
                <h2 className="text-[#ffffff] text-xl font-bold mb-1 truncate">
                    {trackDetails.title}
                </h2>
                <p className="text-white/70 text-md truncate">
                    {trackDetails.artist}
                </p>
            </div>
            <button
                className="text-white/70 dynamic-text-hover cursor-pointer flex-shrink-0 ml-4"
                onClick={() => likeTrack({
                    _id: trackDetails._id,
                    title: trackDetails.title,
                    coverImageUrl: trackDetails.coverImageUrl,
                    audioUrl: trackDetails.audioUrl,
                    artist: trackDetails.artist,
                    duration: trackDetails.duration,
                    genre: [],
                    albumId: trackDetails.albumId,
                    albumName: trackDetails.albumName,
                    hasLiked: trackDetails.hasLiked,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })}
            >
                {
                    hasLiked ? <SavedIcon /> : <AddIcon />
                }
            </button>
        </div>
    )
}

export default TrackInfo