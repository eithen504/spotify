import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { PinIcon } from '../../../../../Svgs'

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
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

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
                            <div className="font-medium text-white truncate">{item.title}</div>
                            <div className="text-[#aaaaaa] truncate">
                                <span className="truncate text-sm">{item.description}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default LibraryItems