import { AddIcon } from "../../../../Svgs"

const TrackInfo = () => {
    return (
        <div className="px-6 py-2 flex items-center justify-between flex-shrink-0 w-full mb-4">
            <div className="flex flex-col flex-grow min-w-0">
                <h2 className="text-[#ffffff] text-xl font-bold mb-1 truncate">
                    Save Your Tears
                </h2>
                <p className="text-white/70 text-md truncate">
                    The Weekdn
                </p>
            </div>
            <button className="text-white/70 dynamic-text-hover cursor-pointer flex-shrink-0 ml-4">
                <AddIcon />
            </button>
        </div>
    )
}

export default TrackInfo