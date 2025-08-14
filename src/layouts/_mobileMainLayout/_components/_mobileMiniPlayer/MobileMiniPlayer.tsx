import type React from "react"
import TrackInfo from "./TrackInfo"
import RightControls from "./RightControls"

interface MobileMiniPlayerProps {
    onOpen: () => void
}

const MobileMiniPlayer: React.FC<MobileMiniPlayerProps> = ({ onOpen }) => {
    return (
        <div className="fixed bottom-[70px] left-0 w-full px-2 z-40 cursor-pointer animate-in slide-in-from-bottom duration-300 ease-out"
            onClick={onOpen}
        >
            <footer className={`rounded-sm w-full h-[57px] flex items-center justify-between px-4 shadow-md`}
                style={{ background: '#460B1D' }}
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