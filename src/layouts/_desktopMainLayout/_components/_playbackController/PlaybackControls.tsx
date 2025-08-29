import type React from "react";
import { Slider } from "../../../../components/ui/slider"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, ShuffleIcon } from "../../../../Svgs"
import { formatDuration } from "../../../../utils";

interface PlaybackControlsProps {
    progress: number[];
    currentTime: number;
    handleProgressChange: (value: number[]) => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({ 
    progress,
    currentTime,
    handleProgressChange 
}) => {
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();

    const handlePlayPause = () => {
        setTrackDetails({ isPlaying: !trackDetails.isPlaying })
    }

    return (
        <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center space-x-6 mb-2 text-[#b3b3b3]">
                <button className="dynamic-text-hover cursor-pointer"
                    title="Enable Shuffle"
                >
                    <ShuffleIcon width="16" height="16" />
                </button>
                <button className="dynamic-text-hover cursor-pointer"
                    title="Previous"
                >
                    <PrevIcon width="16" height="16" />
                </button>
                <button
                    className={`p-2 bg-[#ffffff] text-black rounded-full flex items-center justify-center transition-transform cursor-pointer`}
                    onClick={handlePlayPause}
                    disabled={!trackDetails._id}
                >
                    {
                        trackDetails.isPlaying ? <PauseIcon width="16" height="16" /> : <PlayIcon width="16" height="16" />
                    }
                </button>
                <button className="dynamic-text-hover cursor-pointer"
                    title="Next"
                >
                    <NextIcon width="16" height="16" />
                </button>
                <button className="dynamic-text-hover cursor-pointer"
                    title="Enable Repeat"
                >
                    <RepeatIcon width="16" height="16" />
                </button>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
                <span className="text-xs text-gray-400">{formatDuration(currentTime)}</span>
                <Slider
                    max={100}
                    defaultValue={[0]}
                    value={progress}
                    onValueChange={handleProgressChange}
                    className={`cursor-grab w-full`}
                />
                <span className="text-xs text-gray-400">{trackDetails.duration}</span>
            </div>
        </div>
    )
}

export default PlaybackControls