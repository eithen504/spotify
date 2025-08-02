import { AddIcon, ShareIcon } from '../../../../../Svgs'

const TrackInfo = () => {
    return (
        <div>
            <img
                src="https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96"
                alt="Play Date"
                className="rounded-[4px] w-full object-cover aspect-square"
            />
            <div className="mt-6 flex items-center justify-between">
                {/* Left: Title and Subtitle */}
                <div>
                    <p className="text-2xl font-bold">Play Date</p>
                    <p className="text-md text-[#aaaaaa] font-medium">Melanie Martinez</p>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-4 text-xl text-[#8f8f8f]">
                    <button
                        className="dynamic-text-hover cursor-pointer group-hover-opacity transition-all duration-400 ease-out"
                        style={{
                            '--textHoverColor': '#ffffff',
                            '--hoverOpacity': 1
                        } as React.CSSProperties}
                    >
                        <ShareIcon width="16" height="16" />
                    </button>
                    <button
                        className="dynamic-text-hover cursor-pointer"
                        style={{
                            '--textHoverColor': '#ffffff',
                        } as React.CSSProperties}
                    >
                        <AddIcon width="16" height="16" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TrackInfo