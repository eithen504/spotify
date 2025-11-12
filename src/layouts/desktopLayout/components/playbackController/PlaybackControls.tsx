import type React from "react";
import { Slider } from "../../../../components/ui/slider"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, ShuffleIcon } from "../../../../Svgs"
import { formatDuration } from "../../../../utils";
import { useQueueStore } from "../../../../store/useQueueStore";
import { useRepeatTrackStore } from "../../../../store/useRepeatTrackStore";

interface PlaybackControlsProps {
    progress: number[];
    currentTime: number;
    handlePlayPauseTrack: () => void;
    handlePlayNextTrack: () => void;
    handlePlayPrevTrack: () => void;
    handleProgressChange: (value: number[]) => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
    progress,
    currentTime,
    handlePlayPauseTrack,
    handlePlayNextTrack,
    handlePlayPrevTrack,
    handleProgressChange
}) => {
    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();
    const { customQueue, activeEntityQueueListNode } = useQueueStore();
    const { repeatTracks, addToRepeatTracks, removeFromRepeatTrack } = useRepeatTrackStore();

    /* ---------- Derived Values ---------- */
    const hasPrev = activeEntityQueueListNode?.prev?.value;
    const hasNext = activeEntityQueueListNode?.next?.value || customQueue.head.next?.value;
    const hasTrackInRepeat = repeatTracks[trackDetails._id];

    /* ---------- Methods Or Functions ---------- */
    const handleRepeatTrack = () => {
        if (hasTrackInRepeat) {
            removeFromRepeatTrack(trackDetails._id);
        } else {
            addToRepeatTracks(trackDetails._id);
        }
    }

    return (
        <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center space-x-6 mb-2 text-[#b3b3b3]">
                <button className={`${trackDetails._id ? "dynamic-text-hover cursor-pointer" : "cursor-not-allowed"}`}
                    title={trackDetails._id ? "Enable Shuffle" : ""}
                    disabled={!trackDetails._id}
                >
                    <ShuffleIcon width="16" height="16" />
                </button>

                <button
                    className={`${(trackDetails._id && hasPrev) ? "dynamic-text-hover cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
                    title={(trackDetails._id && hasPrev) ? "Previous" : ""}
                    onClick={handlePlayPrevTrack}
                    disabled={(!trackDetails._id && !hasPrev)}
                >
                    <PrevIcon width="16" height="16" />
                </button>

                <button
                    className={`${trackDetails._id ? "cursor-pointer" : "cursor-not-allowed"} p-2 bg-[#ffffff] text-black rounded-full flex items-center justify-center transition-transform`}
                    title={trackDetails._id ? (trackDetails.isPlaying ? "Pause" : "Play") : ""}
                    onClick={handlePlayPauseTrack}
                    disabled={!trackDetails._id}
                >
                    {
                        trackDetails.isPlaying ? <PauseIcon width="16" height="16" /> : <PlayIcon width="16" height="16" />
                    }
                </button>

                <button
                    className={`${(trackDetails._id && hasNext) ? "dynamic-text-hover cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
                    title={(trackDetails._id && hasNext) ? "Next" : ""}
                    onClick={handlePlayNextTrack}
                    disabled={(!trackDetails._id && !hasNext)}
                >
                    <NextIcon width="16" height="16" />
                </button>

                <button className={`${trackDetails._id ? (hasTrackInRepeat ? "text-[#3BE477]" : "dynamic-text-hover") + " cursor-pointer" : "cursor-not-allowed"}`}
                    title={trackDetails._id ? (hasTrackInRepeat ? "Disable Repeat" : "Enable Repeat") : ""}
                    onClick={handleRepeatTrack}
                    disabled={!trackDetails._id}
                >
                    <RepeatIcon width="16" height="16" />
                </button>
            </div>

            <div className="flex items-center space-x-2 w-full max-w-md">
                <span className="text-xs text-gray-400 w-10 text-right">
                    {formatDuration(currentTime)}
                </span>

                <Slider
                    max={100}
                    defaultValue={[0]}
                    value={progress}
                    onValueChange={handleProgressChange}
                    className={`${trackDetails._id ? "cursor-grab" : "cursor-not-allowed"} w-full`}
                />

                <span className="text-xs text-gray-400 w-10 text-left">
                    {formatDuration(trackDetails.duration)}
                </span>
            </div>

        </div>
    )
}

export default PlaybackControls