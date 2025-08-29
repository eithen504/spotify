import type React from "react"
import { MusicIcon } from "../../../Svgs"

interface NowPlayingViewMusicPlaceholderProps {
    shouldShowPlaceholderIcon: boolean
}

const NowPlayingViewMusicPlaceholder: React.FC<NowPlayingViewMusicPlaceholderProps> = ({ shouldShowPlaceholderIcon }) => {
    return (
        <div
            className="rounded-[4px] w-full aspect-square bg-[#282828] flex items-center justify-center"
        >
            {
                shouldShowPlaceholderIcon && <MusicIcon width="100" height="100" />
            }
        </div>
    )
}

export default NowPlayingViewMusicPlaceholder