import { CrossIcon } from "../../../../Svgs"

const RecentSearchesDropdown = () => {
    return (
        <div className="absolute top-full p-2 z-800 mt-2 w-full max-h-77 overflow-y-auto custom-scrollbar bg-[#2A2A2A] text-white rounded-lg shadow-lg border border-[#2a2a2a]">
            <div className="p-2 border-b border-[#2a2a2a] font-semibold text-md">
                Recent searches
            </div>

            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="group cursor-pointer dynamic-bg-hover text-white p-2 rounded-md flex items-center relative"
                    style={{ '--bgHoverColor': '#404040' } as React.CSSProperties}
                >
                    {/* Thumbnail */}
                    <img
                        src="https://riyabhorkar.com/wp-content/uploads/2024/12/ecfc79086b8032844b087b6caedf36d6.jpg"
                        alt="Album Art"
                        className="w-12 h-12 rounded-sm object-cover"
                    />

                    {/* Text Info */}
                    <div className="ml-3 flex flex-col overflow-hidden">
                        <span className="text-md">Ishq Hai</span>
                        <span className="text-sm text-gray-300 truncate w-56">
                            Anurag Saikia, Raj Shekhar, Romy, Amarabha...
                        </span>
                    </div>

                    {/* Cross Icon */}
                    <button
                        className="mr-2 absolute right-2 text-[#8f8f8f] dynamic-text-hover group-hover-opacity-100 transition-opacity duration-200 cursor-pointer"
                        style={{
                            '--textHoverColor': '#ffffff',
                        } as React.CSSProperties}
                    >
                        <CrossIcon width="15" height="15" />
                    </button>
                </div>
            ))}

            <div className="p-2">
                <button
                    className="py-1.5 px-6 text-sm border border-[#7c7c7c] dynamic-border-hover font-medium rounded-full cursor-pointer"
                    style={{
                        '--borderHoverColor': '#ffffff',
                    } as React.CSSProperties}
                >
                    Clear recent searches
                </button>
            </div>
        </div>


    )
}

export default RecentSearchesDropdown