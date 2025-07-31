import PlaybackControls from "./PlaybackControls"
import RightSideControls from "./RightSideControls"
import TrackInfo from "./TrackInfo"

const PlaybackController = () => {
    return (
        <footer className={`bg-black px-4 py-4`}>
            <div className="flex items-center justify-between">
                {/* Track Info */}
                <TrackInfo />

                {/* Playback Controls */}
                <PlaybackControls />

                {/* Right Side Controls */}
                <RightSideControls />
            </div>
        </footer>
    )
}

export default PlaybackController