import { MobileMiniPlayerMusicPlaceholder } from "../../../../components/Placeholders";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"

const TrackInfo = () => {
    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div className="flex items-center min-w-0"> {/* min-w-0 allows truncation inside flex */}
            {
                trackDetails.coverImageUrl ? (
                    <img
                        src={trackDetails.coverImageUrl}
                        alt="Album Art"
                        className="w-[42px] h-[42px] rounded-[4px] object-cover"
                    />
                ) : (
                    <MobileMiniPlayerMusicPlaceholder />
                )
            }
            <div className="text-[#ffffff] ml-3 min-w-0"> {/* min-w-0 required for truncation */}
                <p className="text-sm font-bold leading-tight truncate">{trackDetails.title}</p>
                <p className="text-sm text-gray-300 truncate">{trackDetails.artist}</p>
            </div>
        </div>
    )
}

export default TrackInfo