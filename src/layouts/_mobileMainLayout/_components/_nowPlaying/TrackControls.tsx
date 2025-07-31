import { NextIcon, PlayIcon, PrevIcon, RepeatIcon, TimerIcon } from "../../../../Svgs"

const TrackControls = () => {
    return (
        <div className="px-6 py-3 flex-shrink-0">
            <div className="text-white flex items-center justify-between">
                <button className="cursor-pointer">
                    <RepeatIcon width="23" height="23" />
                </button>
                <button className="cursor-pointer">
                    <PrevIcon />
                </button>
                <button className="cursor-pointer p-5 bg-white text-black rounded-full"
                >
                    <PlayIcon width="20" height="20" />
                </button>
                <button className="cursor-pointer">
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