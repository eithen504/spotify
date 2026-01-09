import { NowPlayingMusicPlaceholder } from "../../../../components/Placeholders";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";

const TrackArt = () => {
    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div className="flex-1 flex items-center justify-center px-6 py-2 min-h-0">
            <div className="w-full h-full flex items-center justify-center aspect-square overflow-hidden">
                {
                    trackDetails.coverImageUrl ? (
                        <img
                            src={trackDetails.coverImageUrl}
                            alt="Album Cover"
                            className="now-playing-track-size shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-sm"
                        />
                    ) : (
                        <NowPlayingMusicPlaceholder />
                    )
                }
            </div>
        </div>
    );
};

export default TrackArt;
