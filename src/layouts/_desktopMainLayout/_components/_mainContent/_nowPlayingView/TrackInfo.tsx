import NowPlayingViewMusicPlaceholder from '../../../../../components/ui/placeholders/NowPlayingViewMusicPlaceholder';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import { AddIcon, ShareIcon } from '../../../../../Svgs'

const TrackInfo = () => {
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div>
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
            <div className="mt-6 flex items-center justify-between">
                {/* Left: Title and Subtitle */}
                <div className="flex-1 min-w-0 pr-4">
                    <p className="text-2xl font-bold truncate">{trackDetails.title || "No Track Selected"}</p>
                    <p className="text-md text-[#aaaaaa] font-medium truncate">{trackDetails.artist}</p>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-4 text-xl text-[#8f8f8f] flex-shrink-0">
                    <button
                        className="dynamic-text-hover cursor-pointer group-hover-opacity transition-all duration-400 ease-out"
                    >
                        <ShareIcon width="16" height="16" />
                    </button>
                    <button
                        className="dynamic-text-hover cursor-pointer"
                    >
                        <AddIcon width="16" height="16" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TrackInfo