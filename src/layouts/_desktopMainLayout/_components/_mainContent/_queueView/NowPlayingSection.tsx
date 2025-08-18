const NowPlayingSection = () => {
    return (
        <div className="px-2">
            <h2 className="text-white text-md font-bold px-2 pb-2">Now Playing</h2>

            <div className="cursor-pointer flex items-center space-x-3 p-2 hover:bg-[#1F1F1F] rounded-sm">
                <img
                    src={"https://i.scdn.co/image/ab67706f00000002d2c23cff8e4056e5c891216d"}
                    alt={"trackDetails.title"}
                    className="w-12 h-12 flex-shrink-0 object-cover rounded-[4px]"
                />

                <div className="overflow-hidden">
                    <p className="text-md font-medium truncate text-[#3BE477]">
                        {"Please Play Any Track"}
                    </p>
                    <p className="text-sm text-white/70 truncate">
                        {'trackDetails.artist'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NowPlayingSection