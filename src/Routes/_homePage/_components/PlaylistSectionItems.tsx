import React, { useRef, useState } from 'react'
import { LeftArrowIcon, PlayIcon, RightArrowIcon } from '../../../Svgs';
import { useNavigate } from 'react-router-dom';

const PlaylistSectionItems = () => {
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

    const navigate = useNavigate();
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
            const scrollAmount = direction === 'left' ? -250 : 250;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };

    return (
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
                            onClick={() => navigate("/playlist/123")}
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
    )
}

export default PlaylistSectionItems