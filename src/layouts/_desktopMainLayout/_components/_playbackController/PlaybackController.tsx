import { useEffect, useRef, useState } from "react"
import PlaybackControls from "./PlaybackControls"
import RightSideControls from "./RightSideControls"
import TrackInfo from "./TrackInfo"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"

const PlaybackController = () => {
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const [progress, setProgress] = useState([0]);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleProgressChange = (value: number[]) => {
        if (!trackDetails._id) return;
        if (audioRef.current) {
            // Convert percentage to seconds
            const newTimeInSeconds = (value[0] / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTimeInSeconds;
        }
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        if ((trackDetails.isPlaying)) {
            audio.play();
        } else if (!trackDetails.isPlaying) {
            audio.pause();
        }
    }, [trackDetails]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        // Handle browser media control events
        const handlePlay = () => {
            setTrackDetails({ isPlaying: true });
        };

        const handlePause = () => {
            setTrackDetails({ isPlaying: false });
        };

        const handleTimeUpdate = () => {
            setProgress([(audio.currentTime / audio.duration) * 100]);
            setCurrentTime(audio.currentTime);
        };

        const handleAudioEnd = () => {

        }

        // Attach event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            // Clean up event listeners
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [trackDetails]);

    return (
        <footer className={`bg-black px-4 py-4`}>
            <div className="flex items-center justify-between">
                {/* Track Info */}
                <TrackInfo />

                {/* Playback Controls */}
                <PlaybackControls progress={progress} currentTime={currentTime} handleProgressChange={handleProgressChange} />

                {/* Right Side Controls */}
                <RightSideControls />
            </div>
            {
                trackDetails._id && (
                    <audio
                        ref={audioRef}
                        src={trackDetails.audioUrl}
                    />
                )
            }
        </footer>
    )
}

export default PlaybackController