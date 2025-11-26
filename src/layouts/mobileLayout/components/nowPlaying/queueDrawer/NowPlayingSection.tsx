import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore'
import { QueueViewMusicPlaceHolder } from '../../../../../components/Placeholders';
import { PauseIcon, PlayIcon } from '../../../../../Svgs';

const NowPlayingSection = () => {
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();

    const handlePlayPause = () => {
        setTrackDetails({ isPlaying: !trackDetails.isPlaying });
    }

    return (
        <div className="px-2">
            <h2 className="text-[#ffffff] text-md font-bold px-2 pb-2">Now Playing</h2>

            <div className="flex items-center space-x-3 p-2 rounded-sm">
                <div className="relative flex-shrink-0">
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
                </div>

                <div className="overflow-hidden flex-1 min-w-0">
                    <p className={`text-md font-medium truncate ${trackDetails.isPlaying ? "text-[#3BE477]" : "text-[#ffffff]"}`}>
                        {trackDetails.title}
                    </p>
                    <p className="text-sm text-white/70 truncate">
                        {trackDetails.artist}
                    </p>
                </div>

                {/* Play icon on the right side - always visible */}
                <div className="flex-shrink-0">
                    <button
                        className="cursor-pointer text-[#000000] bg-[#ffffff] p-3 rounded-full"
                        onClick={handlePlayPause}
                    >
                        {
                            trackDetails.isPlaying ? <PauseIcon width="15" height="15" /> : <PlayIcon width="15" height="15" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NowPlayingSection