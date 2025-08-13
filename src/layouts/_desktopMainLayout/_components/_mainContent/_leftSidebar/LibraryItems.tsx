import useBreakPoint from '../../../../../hooks/useBreakPoint';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { PinIcon, PlayIcon } from '../../../../../Svgs'

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

const LibraryItems = () => {
    const { preferences: { leftPanelSize, isLeftSidebarExpanded, view } } = useUIPreferencesStore();
    const [breakpoint] = useBreakPoint();

    if (leftPanelSize <= 10) {
        return (
            <div className="mb-3">
                <div className="flex justify-center group">
                    <div
                        className="p-2 dynamic-bg-hover rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer"
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                    >
                        <img
                            src={"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"}
                            alt={"Liked Songs"}
                            className="w-12 h-12 rounded-[4px] object-cover"
                        />
                    </div>
                </div>

                {
                    items.map((item, idx) => {
                        return (
                            <div
                                key={idx}
                                className="flex justify-center group"
                            >
                                <div
                                    className="p-2 dynamic-bg-hover rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer"
                                    style={{
                                        '--bgHoverColor': '#1F1F1F',
                                    } as React.CSSProperties}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-[4px] object-cover"
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        view == "Compact List" ? (
            <div className="flex-1 px-3 mb-4">
                {/* Liked Tracks */}
                <div
                    className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                    style={{
                        '--bgHoverColor': '#1F1F1F',
                    } as React.CSSProperties}
                >
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-md text-[#ffffff] truncate">Liked Tracks</div>
                        <div className="flex items-center gap-1 text-[#aaaaaa] truncate">
                            <div className="rotate-45 text-[#1CC558]">
                                <PinIcon width="14" height="14" />
                            </div>
                            <span className="truncate text-sm">Playlist</span>
                        </div>
                    </div>
                </div>

                {
                    items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{item.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{item.description}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : (
            view == "Default List" ? (
                <div className="flex-1 px-3 mb-4">
                    {/* Liked Tracks */}
                    <div
                        className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                    >
                        <div className="w-12 h-12 rounded overflow-hidden">
                            <img
                                src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                                alt="New Music Friday India"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-md text-[#ffffff] truncate">Liked Tracks</div>
                            <div className="flex items-center gap-1 text-[#aaaaaa] truncate">
                                <div className="rotate-45 text-[#1CC558]">
                                    <PinIcon width="14" height="14" />
                                </div>
                                <span className="truncate text-sm">Playlist</span>
                            </div>
                        </div>
                    </div>

                    {
                        items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                                style={{
                                    '--bgHoverColor': '#1F1F1F',
                                } as React.CSSProperties}
                            >
                                <div className="w-12 h-12 rounded overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt="Top Tracks 2024 India"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-[#ffffff] truncate">{item.title}</div>
                                    <div className="text-[#aaaaaa] truncate">
                                        <span className="truncate text-sm">{item.description}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                view == "Compact Grid" ? (
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
                        </div>

                        {
                            items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="group p-3 dynamic-bg-hover cursor-pointer rounded-[4px] flex flex-col overflow-hidden"
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
                                    </div>
                                )
                            })
                        }

                    </div>
                ) : (
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
            )
        )
    )
}

export default LibraryItems