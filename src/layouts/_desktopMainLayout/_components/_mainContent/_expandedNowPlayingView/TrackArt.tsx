const TrackArt = () => {
    return (
        <div className="flex justify-center items-center flex-1 relative">
            {/* Left Wave */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 wave-left">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="wave-bar"></div>
                ))}
            </div>

            <div className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                <img
                    src={'https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96'}
                    alt="Release Radar Cover"
                    className="custom-img object-cover rounded-xl"
                />

            </div>

            {/* Right Wave */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 wave-right">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="wave-bar"></div>
                ))}
            </div>

        </div>
    )
}

export default TrackArt