import { Slider } from "../../../../components/ui/slider"
import { NextIcon, PlayIcon, PrevIcon, RepeatIcon, ShuffleIcon } from "../../../../Svgs"

const PlaybackControls = () => {
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
                    className={`p-2 bg-white text-black rounded-full flex items-center justify-center transition-transform cursor-pointer`}
                >
                    <PlayIcon width="16" height="16" />
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
                <span className="text-xs text-gray-400">{"0:00"}</span>
                <Slider
                    max={100}
                    defaultValue={[0]}
                    className={`cursor-grab w-full`}
                />
                <span className="text-xs text-gray-400">{"4:55"}</span>
            </div>
        </div>
    )
}

export default PlaybackControls