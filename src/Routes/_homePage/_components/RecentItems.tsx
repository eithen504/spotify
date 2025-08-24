import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { PlayIcon } from "../../../Svgs";

const RecentItems = () => {
    const items = [
        {
            title: "Liked Songs",
            image: "https://misc.scdn.co/liked-songs/liked-songs-640.png"
        },
        {
            title: "Bollywood Dance Music",
            image: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36"
        },
        {
            title: "Happy Vibes",
            image: "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96"
        },
        {
            title: "Bajrangi Bhaijaan",
            image: "https://i.scdn.co/image/ab67616d00001e022753d9786604e09ebdbf0244"
        },
        {
            title: "Bollywood Party Hits 2000-2022",
            image: "https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4"
        },
        {
            title: "All the Little Lights (Deluxe)",
            image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9"
        },
        {
            title: "Khamoshiyan",
            image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9"
        },
        {
            title: "The Weeknd – Popular Songs",
            image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9"
        }
    ];

    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div className="pt-18 md:pt-2 px-4 md:px-10 max-w-[90rem] mx-auto">
            <div className={`grid grid-cols-2 ${leftPanelSize <= 28 ? "md:grid-cols-4" : "md:grid-cols-2"} gap-2`}>
                {items?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="relative bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-[4px] overflow-hidden transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-12 object-cover flex-shrink-0"
                                />
                                <div className="p-2 flex-1 min-w-0">
                                    <h3 className="text-[#ffffff] font-semibold text-sm leading-tight truncate pr-0">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Play button shown on hover */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 group-hover-opacity transition-opacity cursor-pointer">
                                <button className="bg-[#1ed760] hover:bg-[#3BE477] text-black rounded-full p-2.5 cursor-pointer"
                                >
                                    <PlayIcon width="15" height="15" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentItems