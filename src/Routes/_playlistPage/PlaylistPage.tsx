import Footer from "../../components/ui/footer";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { AddIcon, ClockIcon, DefaultListIcon, DropdownIcon, MoreIcon, PlayIcon, ShareIcon } from "../../Svgs";

const PlaylistPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const {isScrollExceeded} = useScrollStore();

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

    return (
        <div className="relative text-white min-h-screen">
            {/* Background gradient */}
            <div
                className="w-full absolute inset-0 z-0 h-[700px]"
                style={{
                    height: '250px',
                    opacity: 1,
                    backgroundImage: `linear-gradient(to bottom, #2D2453, #121212)`
                }}
            />

            {/* Playlist Header */}
            <header className={`${isScrollExceeded ? "flex": "hidden"} max-w-[90rem] mx-auto gap-3 shadow-[0_4px_5px_rgba(0,0,0,0.1)] fixed md:sticky top-0 left-0 w-full z-50 px-4 md:px-6 py-[8.2px] items-center mb-[0px] md:-mb-[64px]`}
                style={{ background: '#2D2453' }}
            >
                <button className={`transition-opacity duration-400 ease-in-out mt-0.5 cursor-pointer p-3.5 rounded-full text-black bg-[#1ed760] dynamic-bg-hover`}
                    style={{
                        '--bgHoverColor': '#3BE477',
                    } as React.CSSProperties}
                >
                    <PlayIcon width="18" height="18" />

                </button>
                <h2 className={`transition-opacity duration-400 ease-in-out text-2xl font-bold truncate overflow-hidden whitespace-nowrap`}>
                    {'title'}
                </h2>

            </header>

            {/* Playlist Info Section */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto">
                {/* Playlist Cover */}
                <img
                    src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"
                    alt="Tollywood Pearls"
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:w-52 md:h-52" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:w-35 md:h-35" : "md:w-40 md:h-40"} shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px]`}
                />
                {/* Playlist Info */}
                <div className="flex flex-col flex-1 min-w-0 text-center md:text-left">
                    <span className="text-sm font-semibold">Public Playlist</span>
                    <h1 className={`text-2xl ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:text-6xl" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:text-4xl" : "md:text-5xl"} font-bold mt-2 truncate`}>
                        Tollywood Pearls djddhhdhdhd
                    </h1>
                    <p className="text-sm text-gray-300 mt-2 truncate">Created by User • 25 songs, 2 hr 15 min</p>
                </div>
            </div>

            {/* Entity Controls */}
            <div className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}>
                <button
                    className={`p-[19px] hidden md:block text-black bg-[#1ed760] dynamic-bg-hover rounded-full cursor-pointer`}
                    style={{
                        '--bgHoverColor': '#3BE477',
                    } as React.CSSProperties}
                >
                    <PlayIcon width="18" height="18" />
                </button>

                <div className={`${leftPanelSize <= 28 ? "w-[38px] h-12" : "w-[34px] h-11"} flex-shrink-none relative rounded-md cursor-pointer group`}>
                    {/* Image container */}
                    <div className="absolute inset-0 overflow-hidden rounded-md p-1">
                        <img
                            src={"https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4"}
                            className="w-full h-full object-cover transition-opacity"
                        />
                    </div>

                    {/* Play button - hidden by default, shown on hover */}
                    <div className="absolute inset-0 flex items-center justify-center group-hover-opacity transition-opacity">
                        <PlayIcon width="15" height="15" />
                    </div>

                    {/* Animated border parts */}
                    <div className="absolute inset-0">
                        {/* Top border - animates from left to right */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/80 animate-border-top"></div>

                        {/* Right border - animates from top to bottom */}
                        <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/80 animate-border-right"></div>

                        {/* Bottom border - animates from right to left */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 animate-border-bottom"></div>

                        {/* Left border - animates from bottom to top */}
                        <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-white/80 animate-border-left"></div>
                    </div>
                </div>

                <button className="text-white/70 dynamic-text-hover cursor-pointer">
                    <AddIcon width="27" height="27" />
                </button>

                <button className="text-white/70 dynamic-text-hover cursor-pointer -mt-1"
                >
                    <ShareIcon width="25" height="25" />
                </button>

                <button className="text-white/70 dynamic-text-hover cursor-pointer"
                >
                    <MoreIcon width="30" height="30" />
                </button>

                <button className="hidden md:flex text-white/70 dynamic-text-hover cursor-pointer ml-auto items-center gap-1.5"
                >
                    {
                        leftPanelSize <= 23 && (
                            <span className="">{"selectedView"}</span>
                        )
                    }

                    <DefaultListIcon width="15" height="15" />
                </button>


                <button
                    className="block md:hidden text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-[19px] ml-auto cursor-pointer"
                    style={{
                        '--bgHoverColor': '#3BE477',
                    } as React.CSSProperties}
                >
                    <PlayIcon width="18" height="18" />
                </button>

            </div>

            <div className="relative max-w-[90rem] mx-auto">
                {/* Playlist Table Header */}
                <div className={`sticky group top-16 left-0 w-full z-10 text-sm text-white/70 bg-[#121212] pb-2 px-10 pt-2 hidden md:flex`}>
                    <div className="w-6">#</div>
                    <div className="flex-1 truncate">Title</div>
                    {
                        false ? (
                            <>
                                <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>{"Artist"}</div>
                                <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>{"Album"}</div>
                            </>
                        ) : (
                            <>
                                <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>{"Album"}</div>
                                <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>{"Date added"}</div>
                            </>
                        )
                    }
                    <div className="w-20 text-right truncate flex items-center justify-center">
                        <ClockIcon width="18" height="18" />
                    </div>

                    <button className="cursor-pointer group-hover-opacity"
                    >
                        {/* Replace with your desired icon */}
                        <DropdownIcon width="15" height="15" />
                    </button>

                </div>

                {/* Seperator Line */}
                <div className={`px-6 hidden md:block sticky top-25 left-0 w-full z-10 mb-3`}>
                    <div className="w-full h-[1px] bg-white/10 " />
                </div>

                {/* Playlist Tracks */}
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
            </div>

            <Footer />
        </div>
    );
};

export default PlaylistPage;
