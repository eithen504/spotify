import { ExpandedViewMusicPlaceholder } from "../../../../../components/Placeholders";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore"

const TrackArt = () => {
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div className="flex justify-center items-center flex-1 relative">
            {/* Left Wave */}
            {
                trackDetails.isPlaying && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 wave-left">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="wave-bar"></div>
                        ))}
                    </div>
                )
            }

            {
               trackDetails.coverImageUrl ? (
                    <div className="track-art-size">
                        <img
                            src={trackDetails.coverImageUrl}
                            alt="Release Radar Cover"
                            className="w-full h-full object-cover rounded-xl bg-[#282828] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center"
                        />
                    </div>
                ) : (
                    <ExpandedViewMusicPlaceholder />
                )
            }

            {/* Right Wave */}
            {
                trackDetails.isPlaying && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 wave-right">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="wave-bar"></div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default TrackArt