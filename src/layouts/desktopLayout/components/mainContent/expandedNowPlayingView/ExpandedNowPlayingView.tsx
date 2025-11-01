import { useDominantColor } from "../../../../../hooks/color";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import Header from "./Header";
import TrackArt from "./TrackArt";

const ExpandedNowPlayingView = () => {
    const { trackDetails } = useTrackDetailsStore();
    const { dominantColor } = useDominantColor(trackDetails.coverImageUrl || "");

    return (
        <div className="h-full w-full rounded-lg flex flex-col mt-2"
            style={{ background: dominantColor || "#3C3C3C" }}
        >
            {/* Header */}
            <Header />

            {/* Track Art */}
            <TrackArt />
        </div>
    )
}

export default ExpandedNowPlayingView