import { AddIcon, PlayIcon } from "../../../../Svgs"

const RightControls = () => {
    return (
        <div className="flex items-center space-x-6 text-[#ffffff]">
            <button aria-label="Favorite" className="text-white/70 dynamic-text-hover cursor-pointer">
                <AddIcon />
            </button>
            <button aria-label="Play" className="cursor-pointer text-[#ffffff]">
                <PlayIcon width="22" height="22" />
            </button>
        </div>
    )
}

export default RightControls