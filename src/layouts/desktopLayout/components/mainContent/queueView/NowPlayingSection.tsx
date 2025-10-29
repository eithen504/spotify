import { QueueViewMusicPlaceHolder } from "../../../../../components/Placeholders";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore"
import { PauseIcon, PlayIcon } from "../../../../../Svgs";

const NowPlayingSection = () => {
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();

    const handlePlayPause = () => {
        setTrackDetails({ isPlaying: !trackDetails.isPlaying });
    }

    return (
        <div className="px-2">
            <h2 className="text-[#ffffff] text-md font-bold px-2 pb-2">Now Playing</h2>

            <div className="cursor-pointer group flex items-center space-x-3 p-2 hover:bg-[#1F1F1F] rounded-sm">
                <div className="relative">
                    {
                        trackDetails.coverImageUrl ? (
                            <img
                                src={trackDetails.coverImageUrl}
                                alt={trackDetails.title}
                                className="w-12 h-12 flex-shrink-0 object-cover rounded-[4px]"
                            />
                        ) : (
                            <QueueViewMusicPlaceHolder />
                        )
                    }

                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                        <button
                            className="flex items-center justify-center rounded-full text-white cursor-pointer"
                            title={trackDetails.isPlaying ? `Play ${trackDetails.title}` : `Pause ${trackDetails.title}`}
                            onClick={handlePlayPause}
                        >
                            {
                                trackDetails.isPlaying ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                            }
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <p className={`text-md font-medium truncate ${trackDetails.isPlaying ? "text-[#3BE477]" : "text-[#ffffff]"}`}>
                        {trackDetails.title}
                    </p>
                    <p className="text-sm text-white/70 truncate">
                        {trackDetails.artist}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NowPlayingSection