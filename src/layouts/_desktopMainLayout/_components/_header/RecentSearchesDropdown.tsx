import { CrossIcon } from "../../../../Svgs"

const RecentSearchesDropdown = () => {
    return (
        <div className="absolute top-full p-2 z-800 mt-2 w-full max-h-77 overflow-y-auto custom-scrollbar bg-[#282828] text-[#ffffff] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-[#2a2a2a]">
            <div className="p-2 border-b border-[#2a2a2a] font-semibold text-md">
                Recent searches
            </div>

            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="group cursor-pointer dynamic-bg-hover text-[#ffffff] p-2 rounded-sm flex items-center relative"
                    style={{ '--bgHoverColor': '#404040' } as React.CSSProperties}
                >
                    {/* Thumbnail */}
                    <div className="shrink-0 w-12 h-12">
                        <img
                            src="https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96"
                            alt="Album Art"
                            className="h-full w-full rounded-[4px] object-cover"
                        />
                    </div>

                    {/* Text Info */}
                    <div className="ml-3 flex flex-col overflow-hidden">
                        <span className="text-md">Ishq Hai</span>
                        <span className="text-sm text-gray-300 truncate mr-6">
                            Anurag Saikia, Raj Shekhar, Romy,  Amarabha Amarabha Amarabha Amarabha Amarabha
                        </span>
                    </div>

                    {/* Cross Icon */}
                    <button
                        className="mr-1 absolute right-2 text-[#8f8f8f] dynamic-text-hover group-hover-opacity cursor-pointer"
                    >
                        <CrossIcon width="15" height="15" />
                    </button>
                </div>
            ))}

            <div className="p-2">
                <button
                    className="py-1.5 px-6 text-sm border border-[#7c7c7c] dynamic-border-hover font-medium rounded-full cursor-pointer"
                >
                    Clear recent searches
                </button>
            </div>
        </div>


    )
}

export default RecentSearchesDropdown