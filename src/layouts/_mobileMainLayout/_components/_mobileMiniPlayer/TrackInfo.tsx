const TrackInfo = () => {
    return (
        <div className="flex items-center min-w-0"> {/* min-w-0 allows truncation inside flex */}
            <img
                src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                alt="Album Art"
                className="w-[42px] h-[42px] rounded-sm mr-3 object-cover"
            />
            <div className="text-[#ffffff] min-w-0"> {/* min-w-0 required for truncation */}
                <p className="text-sm font-bold leading-tight truncate">Save Your Tears</p>
                <p className="text-sm text-gray-300 truncate">The Weeknd</p>
            </div>
        </div>
    )
}

export default TrackInfo