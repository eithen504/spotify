import { Slider } from "../../../../components/ui/slider"
import { FullScreenIcon, HighVolumeIcon, MiniPlayerIcon, NowPlayingIcon, QueueIcon } from "../../../../Svgs"

const RightSideControls = () => {
    return (
        <div className="flex items-center space-x-4 text-[#8f8f8f] w-1/4 justify-end">
            {/* NowPlaying Icon */}
            <button className={`hidden lg:block hover:text-[#ffffff] cursor-pointer`}>
                <NowPlayingIcon width="16" height="16" />
            </button>

            {/* Queue Icon */}
            <button className={`hidden lg:block hover:text-[#ffffff] cursor-pointer`}
            >
                <QueueIcon width="16" height="16" />
            </button>

            {/* Volume Icon and Slider */}
            <HighVolumeIcon width="16" height="16" />

            <div className="w-20 h-1 rounded-full">
                <Slider
                    defaultValue={[0]}
                    // value={systemVolume}
                    // onValueChange={handleVolumeChange}
                    className={`cursor-grab w-full`}
                />
            </div>

            {/* miniPlyer Icon */}
            <button className={` hover:text-[#ffffff] cursor-pointer`}
            >
                <MiniPlayerIcon width="16" height="16" />
            </button>

            {/* Fullscreen Icon */}
            <button className={` hover:text-[#ffffff] cursor-pointer`}
            >
                <FullScreenIcon width="16" height="16" />
            </button>
        </div>
    )
}

export default RightSideControls