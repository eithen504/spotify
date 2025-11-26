import React from 'react'
import { ClockIcon, RepeatIcon } from '../../../../../Svgs'
import { useRepeatTrackStore } from '../../../../../store/useRepeatTrackStore'
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore'
import { toast } from 'sonner'

const BottomActions = () => {
    const { trackDetails } = useTrackDetailsStore();
    const { repeatTracks, removeFromRepeatTrack, addToRepeatTracks } = useRepeatTrackStore();

    const hasTrackInRepeat = repeatTracks[trackDetails._id];

    const handleRepeatTrack = () => {
        if (hasTrackInRepeat) {
            removeFromRepeatTrack(trackDetails._id);
            toast.success("Track Is Remove From Repeat");
        } else {
            addToRepeatTracks(trackDetails._id);
            toast.success("Track Is Set To Repeat");
        }
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[#ffffff] flex gap-4 z-[2000]">
            {/* Repeat Button */}
            <button
                className={`${hasTrackInRepeat ? "text-[#3BE477]" : ""} bg-[#3a3a3a] dynamic-bg-hover cursor-pointer px-10 py-2 rounded-md flex flex-col items-center`}
                style={{
                    '--bgHoverColor': '#5c5b5b',
                } as React.CSSProperties}
                onClick={handleRepeatTrack}
            >
                <RepeatIcon width="18" height="18" />
                <span className="text-[10px]">Repeat</span>
            </button>

            {/* Timer Button */}
            <button
                className="bg-[#3a3a3a] dynamic-bg-hover cursor-pointer px-10 py-2 rounded-md flex flex-col items-center"
                style={{
                    '--bgHoverColor': '#5c5b5b',
                } as React.CSSProperties}
            >
                <ClockIcon width="18" height="18" />
                <span className="text-[10px]">Timer</span>
            </button>
        </div>
    )
}

export default BottomActions