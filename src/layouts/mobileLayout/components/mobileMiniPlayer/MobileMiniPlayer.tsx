import type React from "react"
import TrackInfo from "./TrackInfo"
import RightControls from "./RightControls"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { useDominantColor } from "../../../../hooks/color"

interface MobileMiniPlayerProps {
    onOpen: () => void
}

const MobileMiniPlayer: React.FC<MobileMiniPlayerProps> = ({ onOpen }) => {
    const { trackDetails } = useTrackDetailsStore();
    const { dominantColor } = useDominantColor(trackDetails.coverImageUrl);

    return (
        <div className="fixed bottom-[71px] left-0 w-full px-2 z-40 cursor-pointer animate-in slide-in-from-bottom duration-300 ease-out"
            onClick={onOpen}
        >
            <footer className={`rounded-sm w-full h-[57px] flex items-center justify-between px-4 shadow-md`}
                style={{ background: dominantColor || '#3C3C3C' }}
            >
                {/* Track Info */}
                <TrackInfo />

                {/* Right Controls */}
                <RightControls />
            </footer>
        </div>
    )
}

export default MobileMiniPlayer