const QueueSection = () => {
    return (
        <div className="bg-[#1e1e1e] mt-4 pb-2 rounded-md shadow-md">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <h3 className="text-md font-semibold text-[#ffffff]">Next in queue</h3>
                <button
                    className="text-sm font-medium text-[#aaaaaa] dynamic-text-hover hover:underline cursor-pointer"
                >
                    Open queue
                </button>
            </div>

            <div className="px-2">
                <div className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded-[4px] cursor-pointer"
                    style={{
                        '--bgHoverColor': '#3F3F3F',
                    } as React.CSSProperties}
                >
                    <img
                        src="https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36" // Replace with your actual track cover
                        alt="Closer"
                        className="w-12 h-12 rounded-[4px] object-cover"
                    />
                    <div className="truncate space-y-2">
                        <p className="text-[#ffffff] text-md font-medium leading-none">Closer</p>
                        <p className="text-[#aaaaaa] text-sm truncate leading-none">The Chainsmokers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueueSection