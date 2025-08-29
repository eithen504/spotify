import useDominantColor from "../../../../../hooks/useDominateColor"
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore"
import Header from "./Header"
import TrackArt from "./TrackArt"

const ExpandedNowPlayingView = () => {
    const {trackDetails} = useTrackDetailsStore();
    const {dominantColor} = useDominantColor(trackDetails.coverImageUrl);

    return (
        <div className="h-full w-full rounded-md flex flex-col"
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