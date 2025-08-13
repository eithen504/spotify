import { useRef, useState } from 'react'
import { useUIPreferencesStore } from '../../store/useUIPreferenceStore';
import { LeftArrowIcon, PlayIcon, RightArrowIcon } from '../../Svgs';
import { HOMEPAGE_TABS } from '../../Constants';
import { useScrollStore } from '../../store/useScrollStore';

const HomePage = () => {
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
    const { isScrolled } = useScrollStore();

    const [activeTab, setActiveTab] = useState("All")

    const scrollRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: true });

    const checkScrollability = (): void => {
        if (scrollRef.current) {
            const container = scrollRef.current as HTMLDivElement;
            const hasHorizontalScroll: boolean = container.scrollWidth > container.clientWidth;
            const atStart: boolean = container.scrollLeft <= 0;
            const atEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

            setCanScroll({
                left: hasHorizontalScroll && !atStart,
                right: hasHorizontalScroll && !atEnd,
            });
        }
    };

    const scroll = (direction: 'left' | 'right'): void => {
        if (scrollRef.current) {
            const container = scrollRef.current as HTMLDivElement;
            const scrollAmount = direction === 'left' ? -500 : 500;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };

    return (
        <div className="relative text-white min-h-screen">
            <div
                className="w-full absolute inset-0 z-0 h-[700px]"
                style={{
                    height: '250px',
                    opacity: 1,
                    backgroundImage: `linear-gradient(to bottom, #2D2453, #121212)`
                }}
            />

            {/* Tabs */}
            <div className={`${isScrolled ? "bg-[#2D2453]" : ""} fixed md:sticky top-0 left-0 w-full z-50 px-4 md:px-10 py-4 max-w-[90rem] mx-auto`}>
                <div className="relative flex space-x-3">
                    {HOMEPAGE_TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`${activeTab === tab
                                ? "text-black bg-white"
                                : "text-white bg-white/15 hover:bg-white/25"
                                } cursor-pointer backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="pb-10 pt-18 md:pt-2 px-4 md:px-10 max-w-[90rem] mx-auto">
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
                                        <h3 className="text-white font-semibold text-sm leading-tight truncate pr-0">
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

            <div className="pb-7 md:pb-10 relative">
                {/* PlaylistSection Header */}
                <div className={`px-4 md:px-10 flex justify-between items-center pb-2`}>
                    <h2 className="text-xl font-bold">Good Morning</h2>
                    <button className="cursor-pointer text-sm text-gray-400 hover:text-white hover:underline flex items-center gap-1 font-bold"
                    >
                        Show all
                    </button>
                </div>

                {/* PlaylistSection Items */}
                <div className="relative [&:hover_.left-arrow]:opacity-100">
                    {/* Fixed left arrow that appears on hover */}
                    {
                        canScroll.left && (
                            <div className={`left-4 md:left-10 left-arrow absolute top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 z-10`}>
                                <button
                                    className="cursor-pointer p-[7px] text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover rounded-full flex items-center justify-center shadow-lg"
                                    style={{
                                        '--bgHoverColor': '#282828',
                                    } as React.CSSProperties}
                                    onClick={() => scroll("left")}
                                >
                                    <LeftArrowIcon width="18" height="18" />
                                </button>
                            </div>
                        )
                    }

                    {/* Fixed right arrow that appears on hover */}
                    {
                        canScroll.right && (
                            <div className="left-arrow absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 z-10">
                                <button
                                    className="cursor-pointer p-[7px] text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover rounded-full flex items-center justify-center shadow-lg"
                                    style={{
                                        '--bgHoverColor': '#282828',
                                    } as React.CSSProperties}
                                    onClick={() => scroll("right")}
                                >
                                    <RightArrowIcon width="18" height="18" />
                                </button>
                            </div>
                        )
                    }

                    <div
                        className={`flex overflow-x-auto hide-scrollbar [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 md:px-7`}
                        ref={scrollRef}
                        onScroll={checkScrollability}
                    >
                        {items.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="dynamic-bg-hover group cursor-pointer rounded-sm p-3 flex-none w-44 transition-transform duration-300"
                                    style={{
                                        '--bgHoverColor': '#1C1C1C',
                                    } as React.CSSProperties}
                                >
                                    <div className="relative overflow-hidden rounded-sm transition-shadow duration-300">
                                        <img
                                            src={item.image}
                                            alt={`Album cover for ${item.title}`}
                                            className="w-full aspect-square rounded-sm transition-opacity duration-300 object-cover"
                                        />

                                        <div className="absolute inset-0">
                                            <button
                                                className="w-[48px] h-[48px] text-black cursor-pointer rounded-full flex items-center justify-center group-hover-opacity transition-all duration-300 bg-[#1ed760] hover:bg-[#3BE477] backdrop-blur-sm absolute bottom-2 right-2"
                                                aria-label={`Play ${item.title}`}
                                            >
                                                <PlayIcon width="20" height="20" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="font-medium text-md mt-2 truncate overflow-ellipsis">{item.title}</div>
                                    <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                                        {`Playlist . Tracks . 5`}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default HomePage