import React from 'react'
import { PinIcon, PlayIcon } from '../../../../../Svgs'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore'
import useBreakPoint from '../../../../../hooks/useBreakPoint';

const items = [
    {
        title: "After Hours",
        image: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        description: "Playlist • Spotify"
    },
    {
        title: "Divide",
        image: "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
        description: "Playlist • Spotify"
    },
    {
        title: "All The Little Lights",
        image: "https://i.scdn.co/image/ab67616d00001e022753d9786604e09ebdbf0244",
        description: "Playlist • Spotify"
    },
    {
        title: "Four",
        image: "https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4",
        description: "Playlist • Spotify"
    },
    {
        title: "Some One Like You",
        image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9",
        description: "Playlist • Spotify"
    },
    {
        title: "Some One Like You",
        image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9",
        description: "Playlist • Spotify"
    }, {
        title: "Some One Like You",
        image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9",
        description: "Playlist • Spotify"
    }, {
        title: "Some One Like You",
        image: "https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9",
        description: "Playlist • Spotify"
    }
];

const DefaultGridItems = () => {
    const { preferences: { leftPanelSize, isLeftSidebarExpanded } } = useUIPreferencesStore();
    const [breakpoint] = useBreakPoint();

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakpoint === "md"
                    ? "grid-layout"
                    : leftPanelSize <= 28
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >

            <div
                className="group p-3 dynamic-bg-hover cursor-pointer rounded-[4px] flex flex-col overflow-hidden"
                style={{
                    '--bgHoverColor': '#1F1F1F',
                } as React.CSSProperties}
            >
                {/* Square Image */}
                <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                    <img
                        src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"
                        alt="Liked Songs"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Play Button with Slide-Up on Hover */}
                    <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                        <button className="bg-[#1ed760] hover:bg-[#3BE477] text-black rounded-full p-4 cursor-pointer transition-transform shadow-lg">
                            <PlayIcon width="17" height="17" />
                        </button>
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full mt-2 text-left">
                    <p className="text-md font-medium truncate">Liked Songs</p>
                    <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                        <div className="rotate-45 text-[#1dc95a]">
                            <PinIcon width="15" height="15" />
                        </div>
                        <p>Playlist</p>
                    </div>
                </div>
            </div>

            {
                items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`group p-3 dynamic-bg-hover cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                        >
                            {/* Square Image */}
                            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt="Liked Songs"
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />

                                {/* Play Button with Slide-Up on Hover */}
                                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                                    <button className="bg-[#1ed760] hover:bg-[#3BE477] text-black rounded-full p-4 cursor-pointer transition-transform shadow-lg">
                                        <PlayIcon width="17" height="17" />
                                    </button>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{item.title}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>{`Playlist . Tracks . 5`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DefaultGridItems