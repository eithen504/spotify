import { AddIcon, DownArrowIcon } from "../../../../Svgs"

const TrackInfo = () => {
    return (
        <div className="flex items-center space-x-3 w-1/4 relative">
            <div className="relative group">
                <img
                    src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                    alt={'trackDetails.title'}
                    className="w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded object-cover group-hover:opacity-70 transition-opacity"
                />

                <button className="absolute cursor-pointer text-gray-400 hover:text-white bg-black/50 rounded-full top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                    <DownArrowIcon />
                </button>
            </div>

            <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
                    {'trackDetails.title'}
                </p>

                <p className="text-gray-400 text-xs truncate">{'trackDetails.artist'}</p>
            </div>

            <button className={`text-gray-400 hover:text-white cursor-pointer`}>
                <AddIcon width="17" height="17" />
            </button>
        </div>
    )
}

export default TrackInfo