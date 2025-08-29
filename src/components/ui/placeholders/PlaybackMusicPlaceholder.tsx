import type React from "react"
import { MusicIcon } from "../../../Svgs"

interface PlaybackMusicPlaceholderProps {
    shouldShowPlaceholderIcon: boolean
}

const PlaybackMusicPlaceholder: React.FC<PlaybackMusicPlaceholderProps> = ({ shouldShowPlaceholderIcon }) => {
    return (
        <div className="w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded object-cover transition-opacity bg-[#282828] text-[#ffffff] flex items-center justify-center">
            {
                shouldShowPlaceholderIcon && <MusicIcon width="28" height="28" />
            }
        </div>
    )
}

export default PlaybackMusicPlaceholder