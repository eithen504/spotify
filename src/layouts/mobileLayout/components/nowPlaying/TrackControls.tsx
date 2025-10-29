import type React from "react";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, TimerIcon } from "../../../../Svgs"
import { useQueueStore } from "../../../../store/useQueueStore";

interface TrackControlsProps {
    handlePlayPauseTrack: () => void;
    handlePlayNextTrack: () => void;
    handlePlayPrevTrack: () => void;
}

const TrackControls: React.FC<TrackControlsProps> = ({ handlePlayPauseTrack, handlePlayNextTrack, handlePlayPrevTrack }) => {
    const { trackDetails } = useTrackDetailsStore();
    const { customQueue, activeEntityQueueListNode } = useQueueStore();
    const hasPrev = activeEntityQueueListNode?.prev?.value;
    const hasNext = activeEntityQueueListNode?.next?.value || customQueue.head.next?.value;

    return (
        <div className="px-6 py-3 flex-shrink-0">
            <div className="text-[#ffffff] flex items-center justify-between">
                <button className="cursor-pointer">
                    <RepeatIcon width="23" height="23" />
                </button>

                <button
                    className={`${hasPrev ? " cursor-pointer opacity-100" : " cursor-not-allowed opacity-40"}`}
                    onClick={handlePlayPrevTrack}
                    disabled={!hasPrev}
                >
                    <PrevIcon />
                </button>

                <button className="cursor-pointer p-5 bg-[#ffffff] text-black rounded-full"
                    onClick={handlePlayPauseTrack}
                >
                    {
                        trackDetails.isPlaying ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                    }
                </button>

                <button
                    className={`${hasNext ? " cursor-pointer opacity-100" : " cursor-not-allowed opacity-40"}`}
                    onClick={handlePlayNextTrack}
                    disabled={!hasNext}
                >
                    <NextIcon />
                </button>

                <button className="cursor-pointer">
                    <TimerIcon width="28" height="28" />
                </button>
            </div>
        </div>
    )
}

export default TrackControls