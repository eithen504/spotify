import React from 'react'
import { AddIcon, MoreIcon, PlayIcon } from '../../../Svgs';
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';
import type { Column } from '../../../Types';

const items = [
    {
        title: "Blinding Lights",
        img: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        album: "After Hours",
        dateAdded: "2020-03-20",
        artist: "The Weeknd"
    },
    {
        title: "Shape of You",
        img: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        album: "÷ (Divide)",
        dateAdded: "2017-01-06",
        artist: "Ed Sheeran"
    },
    {
        title: "Levitating",
        img: "https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f",
        album: "Future Nostalgia",
        dateAdded: "2020-03-27",
        artist: "Dua Lipa"
    },
    {
        title: "Stay",
        img: "https://upload.wikimedia.org/wikipedia/en/0/0c/The_Kid_Laroi_and_Justin_Bieber_-_Stay.png",
        album: "Stay (Single)",
        dateAdded: "2021-07-09",
        artist: "The Kid LAROI, Justin Bieber"
    },
    {
        title: "Uptown Funk",
        img: "https://images.genius.com/82f198169cce34c7e52880cce45d28de.1000x1000x1.png",
        album: "Uptown Special",
        dateAdded: "2014-11-10",
        artist: "Mark Ronson, Bruno Mars"
    },
    {
        title: "Someone Like You",
        img: "https://i.scdn.co/image/ab67616d0000b273744ea41a7c1ae57024752db9",
        album: "21",
        dateAdded: "2011-01-24",
        artist: "Adele"
    },
    {
        title: "Despacito",
        img: "https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png",
        album: "Vida",
        dateAdded: "2017-01-13",
        artist: "Luis Fonsi, Daddy Yankee"
    },
    {
        title: "Bad Guy",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qlyaUVhFANIh-drof0fu9wyLf3V4I3sE5A&s",
        album: "When We All Fall Asleep, Where Do We Go?",
        dateAdded: "2019-03-29",
        artist: "Billie Eilish"
    },
    {
        title: "Rolling in the Deep",
        img: "https://images.genius.com/a9fa6bfb946e5ecde0d63fe20073d5c7.1000x1000x1.png",
        album: "21",
        dateAdded: "2010-11-29",
        artist: "Adele"
    },
    {
        title: "Señorita",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png",
        album: "Señorita (Single)",
        dateAdded: "2019-06-21",
        artist: "Shawn Mendes, Camila Cabello"
    }
];

interface PlaylistTracksProps {
    view: "Compact List" | "Default List";
    columns: Record<Column, boolean>;
}

const PlaylistTracks: React.FC<PlaylistTracksProps> = ({ view, columns }) => {
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
                            <span
                                className={`opacity-100 group-hover-opacity transition-opacity`}
                                style={{
                                    '--initialOpacity': '1',
                                    '--hoverOpacity': '0',
                                } as React.CSSProperties}
                            >
                                {index + 1}
                            </span>

                            <button className="absolute inset-0 group-hover-opacity dynamic-text-group-hover transition-opacity cursor-pointer">
                                <PlayIcon width="14" height="14" />
                            </button>
                        </div>

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            {
                                view == "Default List" && (
                                    <img
                                        src={item.img}
                                        alt={'track.title'}
                                        className="w-[50px] h-[50px] md:w-[42px] md:h-[42px] object-cover rounded-[4px] flex-shrink-0"
                                    />
                                )
                            }

                            <div className="min-w-0">
                                <div className={`font-medium truncate text-[16px] cursor-pointer hover:underline`}>
                                    {item.title}
                                </div>

                                {
                                    view == "Default List" && (
                                        <div className="text-white/70 dynamic-text-group-hover text-sm truncate">{item.artist}</div>
                                    )
                                }
                            </div>
                        </div>

                        {
                            view == "Compact List" ? (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className=" cursor-pointer text-white/70 dynamic-text-hover hover:underline">
                                            {columns["Artist"] && item.artist}
                                        </span>
                                    </div>

                                    <div className={`w-32 text-white/70 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        {columns["Album"] && item.album}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className=" cursor-pointer text-white/70 dynamic-text-hover hover:underline">
                                            {columns["Album"] && item.album}
                                        </span>
                                    </div>

                                    <div className={`w-32 text-white/70 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        {columns["Date added"] && item.dateAdded}
                                    </div>
                                </>
                            )
                        }

                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            <button className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity">
                                <AddIcon width="17" height="17" />
                            </button>

                            <span className="truncate text-white/70">
                                {columns["Duration"] ? "0:24" : ""}
                            </span>

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