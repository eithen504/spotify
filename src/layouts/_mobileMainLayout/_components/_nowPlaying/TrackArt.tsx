const TrackArt = () => {
    return (
        <div className="flex-1 flex items-center justify-center px-6 py-2 min-h-0">
            <div className="w-full track-art-size aspect-square overflow-hidden">
                <img
                    src="https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36"
                    alt="Album Cover"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default TrackArt;
