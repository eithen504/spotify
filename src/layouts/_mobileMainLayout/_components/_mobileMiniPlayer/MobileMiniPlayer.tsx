import type React from "react"
import { AddIcon, PlayIcon } from "../../../../Svgs"

interface MobileMiniPlayerProps {
    onOpen: () => void
}

const MobileMiniPlayer: React.FC<MobileMiniPlayerProps> = ({ onOpen }) => {
    return (
        <div className="fixed bottom-[70px] left-0 w-full px-2 z-40 cursor-pointer animate-in slide-in-from-bottom duration-300 ease-out"
            onClick={onOpen}
        >
            <footer className={`rounded-sm w-full h-[57px] flex items-center justify-between px-4 shadow-md`}
                style={{ background: '#3C3C3C' }}
            >
                {/* Track Info */}
                <div className="flex items-center min-w-0"> {/* min-w-0 allows truncation inside flex */}
                    <img
                        src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                        alt="Album Art"
                        className="w-[42px] h-[42px] rounded-sm mr-3 object-cover"
                    />
                    <div className="text-white min-w-0"> {/* min-w-0 required for truncation */}
                        <p className="text-sm font-bold leading-tight truncate">Save Your Tears</p>
                        <p className="text-sm text-gray-300 truncate">The Weeknd</p>
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-6 text-white">
                    <button aria-label="Favorite" className="text-white/70 hover:text-white cursor-pointer">
                        <AddIcon />
                    </button>
                    <button aria-label="Play" className="cursor-pointer text-white">
                        <PlayIcon width="22" height="22" />
                    </button>
                </div>
            </footer>
        </div>
    )
}

export default MobileMiniPlayer