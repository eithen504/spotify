import React from 'react'
import { AddIcon, MoreIcon, PlayIcon } from '../../../Svgs';
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';

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

const PlaylistTracks = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div className='px-1 md:px-6'>
            {items?.map((item, index) => {

                return (
                    <div
                        key={index}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 dynamic-bg-hover transition rounded-none md:rounded-[5px] group"
                        style={{
                            '--bgHoverColor': '#2A2A2A',
                        } as React.CSSProperties}
                    >
                        <div className="w-6 text-white/70 hidden md:block relative">
                            {
                                false ? (
                                    <div className="group-hover:opacity-0">
                                        <div className="transform wave-left">
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index} className="wave-bar"></div>
                                            ))}
                                        </div>
                                    </div>

                                ) : (
                                    <span
                                        className={`opacity-100 group-hover-opacity transition-opacity`}
                                        style={{
                                            '--initialOpacity': '1',
                                            '--hoverOpacity': '0',
                                        } as React.CSSProperties}
                                    >
                                        {index + 1}
                                    </span>
                                )
                            }

                            <button className="absolute inset-0 opacity-0 group-hover-opacity dynamic-text-group-hover transition-opacity cursor-pointer">
                                <PlayIcon width="14" height="14" />
                            </button>
                        </div>

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            <img
                                src={item.image}
                                alt={'track.title'}
                                className="w-[50px] h-[50px] md:w-[42px] md:h-[42px] object-cover rounded-[4px] flex-shrink-0"
                            />

                            <div className="min-w-0">
                                <div className={`font-medium truncate text-[16px] cursor-pointer hover:underline`}>
                                    {'Liked Tracks'}
                                </div>

                                <div className="text-white/70 dynamic-text-group-hover text-sm truncate">{'track.artist'}</div>
                            </div>
                        </div>

                        <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                            <span
                                className=" cursor-pointer text-white/70 dynamic-text-hover hover:underline"
                            >
                                track.albumName
                            </span>
                        </div>
                        <div className={` w-32 text-white/70 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>12 may 2025</div>

                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            <button className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity">
                                <AddIcon width="17" height="17" />
                            </button>

                            <span className="truncate text-white/70">{"0:24"}</span>

                            <button className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity">
                                <MoreIcon width="21" height="21" />
                            </button>
                        </div>

                        {/* for small screen */}
                        <div className="w-16 text-right justify-end items-center cursor-pointer gap-1 flex md:hidden">
                            <div className="rotate-90 text-white/70 dynamic-text-hover">
                                <MoreIcon />
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default PlaylistTracks