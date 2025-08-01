import Header from "./Header"
import TrackArt from "./TrackArt"

const ExpandedNowPlayingView = () => {
    return (
        <div className="h-full w-full rounded-md flex flex-col"
            style={{ background: '#3467eb' }}
        >
            {/* Header */}
            <Header />

            {/* Track Art */}
            <TrackArt />
        </div>
    )
}

export default ExpandedNowPlayingView