## Desktop Main Layout
import { useRef } from "react";
import { AddIcon, BrowseIcon, CollapsedIcon, DefaultListIcon, DownArrowIcon, ExpandIcon, FullScreenIcon, HighVolumeIcon, HomeFilledIcon, LogoIcon, MiniPlayerIcon, MoreIcon, NextIcon, NowPlayingIcon, PinIcon, PlayIcon, PlusIcon, PrevIcon, QueueIcon, RepeatIcon, RightArrowIcon, SearchIcon, ShareIcon, ShuffleIcon, UnCollapsedIcon } from "../../Svgs";
import { Link, Outlet } from "react-router-dom";
import { Slider } from "../../components/ui/slider";

export default function DesktopMainLayout() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col h-screen outfit">
      {/* Header */}
      <header className="bg-[#000000] text-[#ffffff] px-6 py-[8px] flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          {/* Spotify Logo */}
          <button className="rounded-full flex items-center justify-center">
            <LogoIcon width="35" height="35" />
          </button>
        </div>

        {/* Center Section - Home Button and Search Bar */}
        <div className="flex items-center flex-1 gap-3 justify-center">
          {/* Home Button */}
          <Link to={"/about"}>
            <button className="p-3 text-[#ffffff] bg-[#1f1f1f] hover:bg-[#282828] rounded-full flex items-center justify-center cursor-pointer">
              <HomeFilledIcon />
            </button>
          </Link>

          {/* Search Bar */}
          <div className="max-w-[470px] w-full">
            <div
              className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-3 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <button
                className="mr-3 text-[#adadad] hover:text-[#ffffff] cursor-pointer"
                onClick={(e) => e.stopPropagation()} // pr+event button click from triggering container click
              >
                <SearchIcon />
              </button>

              <input
                ref={inputRef}
                type="text"
                placeholder="What do you want to play?"
                className="bg-transparent focus:outline-none flex-grow text-md placeholder:text-[#adadad]"
              />

              <div className="w-px h-6 bg-[#7C7C7C] mx-4"></div>

              <div className="flex flex-col text-[#adadad] hover:text-[#ffffff] gap-1 cursor-pointer">
                <BrowseIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - User Controls */}
        <div className="flex items-center gap-4">
          {/* Browse Premium */}
          <button className="text-gray-300 hover:text-white text-sm font-semibold">
            Explore Premium
          </button>

          {/* User Profile */}
          <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm hover:scale-105">
            J
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 bg-[#000000] text-white overflow-hidden px-2 gap-2">
        {/* Left Sidebar */}
        <aside className="w-[320px] bg-[#121212] text-white rounded-md flex flex-col h-full overflow-y-auto hide-scrollbar group">
          <div className="sticky top-0 bg-[#121212] z-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-1 px-5 py-3">
              <div className="flex gap-2 items-center">
                <button className="text-[#8f8f8f] hover:text-[#ffffff] cursor-pointer transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-400 ease-out">
                  <CollapsedIcon width="17" height="17" />
                </button>

                <p className="text-md font-bold text-[#ffffff] -ml-7 group-hover:ml-0 transition-all duration-400">Your Library</p>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-[10px] rounded-full text-[#8f8f8f] hover:text-[#ffffff] bg-[#1f1f1f] hover:bg-[#282828] flex items-center justify-center transition cursor-pointer">
                  <PlusIcon width="16" height="16" />
                </button>
                <button className="p-[9.5px] rounded-full text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1f1f1f] flex items-center justify-center transition cursor-pointer">
                  <ExpandIcon width="16" height="16" />
                </button>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="relative px-5">
              <div className="flex space-x-2 mb-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <button className="bg-[#2a2a2a] hover:bg-[#303030] cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium">Playlists</button>
                <button className="bg-[#2a2a2a] hover:bg-[#303030] cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium">Save Playlists</button>
                <button className="bg-[#2a2a2a] hover:bg-[#303030] cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium">Save Albums</button>
                <button className="bg-[#2a2a2a] hover:bg-[#303030] cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium">Podcasts</button>
              </div>
              <button className="absolute right-5 top-0 text-[#8f8f8f] hover:text-[#ffffff] bg-[#1f1f1f] hover:bg-[#2A2A2A] cursor-pointer rounded-full p-[7px] pointer-events-auto z-20">
                <RightArrowIcon width="18" height="18" />
              </button>
              {/* Enhanced right-side shadow (deeper and darker) */}
              <div className="absolute right-5 top-0 bottom-0 w-20 bg-gradient-to-l from-[#121212] via-[#121212]/80 to-transparent pointer-events-none z-10"></div>
            </div>

            {/* Search + Sort */}
            <div className="flex items-center justify-between mb-3 px-5">
              {/* Search Icon */}
              <button className="text-[#8f8f8f] hover:text-[#ffffff] transition-colors">
                <SearchIcon width="17" height="17" />
              </button>

              {/* Recently Added Filter */}
              <div className="flex items-center text-[#8f8f8f] hover:text-[#ffffff] space-x-1 cursor-pointer">
                <span className="text-sm font-semibold">Recently Added</span>
                <button className="transition-colors cursor-pointer">
                  <DefaultListIcon width="16" height="16" />
                </button>
              </div>
            </div>
          </div>

          {/* Library Items */}
          <div className="flex-1 px-3 mb-4">
            {/* Liked Tracks */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
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

            {/* After Hours */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36"
                  alt="Top Tracks 2024 India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">After Hours</div>
                <div className="text-[#aaaaaa] truncate">
                  <span className="truncate text-sm">Playlist • Spotify</span>
                </div>
              </div>
            </div>

            {/* Divide */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96"
                  alt="Top Tracks 2024 India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">Divide</div>
                <div className="text-[#aaaaaa] truncate">
                  <span className="truncate text-sm">Playlist • Spotify</span>
                </div>
              </div>
            </div>

            {/* All The Little Lights */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e022753d9786604e09ebdbf0244"
                  alt="Top Tracks 2024 India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">All The Little Lights</div>
                <div className="text-[#aaaaaa] truncate">
                  <span className="truncate text-sm">Playlist • Spotify</span>
                </div>
              </div>
            </div>

            {/* Four */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4"
                  alt="Top Tracks 2024 India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">Four</div>
                <div className="text-[#aaaaaa] truncate">
                  <span className="truncate text-sm">Playlist • Spotify</span>
                </div>
              </div>
            </div>

            {/* Some One Like You */}
            <div className="flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded cursor-pointer group">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e02164feb363334f93b6458d2a9"
                  alt="Top Tracks 2024 India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">Some One Like You</div>
                <div className="text-[#aaaaaa] truncate">
                  <span className="truncate text-sm">Playlist • Spotify</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Children/Main Center Content */}
        <section className="flex-1 bg-[#121212] p-6 flex justify-center items-start custom-scrollbar overflow-y-auto rounded-md">
          <div className="w-full max-w-3xl">
            <Outlet />
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="w-[260px] bg-[#121212] text-white group relative h-full flex flex-col overflow-y-auto hide-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 bg-[#121212] z-50">
            {/* Title and collapse button */}
            <div className="flex gap-2 items-center">
              <button className="text-[#8f8f8f] hover:text-[#ffffff] cursor-pointer transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-400 ease-out">
                <UnCollapsedIcon width="20" height="20" />
              </button>

              <p className="text-md font-bold text-[#ffffff] -ml-7 group-hover:ml-0 transition-all duration-400">Play Date</p>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
              <button className="text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1E1E1E] p-[6px] cursor-pointer rounded-full transition-colors">
                <MoreIcon width="20" height="20" />
              </button>

              <button className="text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1E1E1E] p-[8px] cursor-pointer rounded-full transition-colors">
                <ExpandIcon width="16" height="16" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 px-4 pb-4">
            {/* Track Info */}
            <div>
              <img
                src="https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96"
                alt="Play Date"
                className="rounded-[4px] w-full object-cover aspect-square"
              />
              <div className="mt-6 flex items-center justify-between">
                {/* Left: Title and Subtitle */}
                <div>
                  <p className="text-2xl font-bold">Play Date</p>
                  <p className="text-md text-[#aaaaaa] font-medium">Melanie Martinez</p>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-4 text-xl text-[#8f8f8f]">
                  <button className="hover:text-[#ffffff] cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <ShareIcon width="16" height="16" />
                  </button>
                  <button className="hover:text-[#ffffff] cursor-pointer">
                    <AddIcon width="16" height="16" />
                  </button>
                </div>
              </div>
            </div>

            {/* Credits Section */}
            <div className="mt-6 bg-[#1e1e1e] p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-[#ffffff]">Credits</h3>
                <button className="text-sm font-medium text-[#aaaaaa] hover:text-[#ffffff] hover:underline cursor-pointer">Show all</button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium">Title</p>
                  <p className="text-sm text-[#aaaaaa]">This Is Our Title</p>
                </div>
                <div>
                  <p className="text-white font-medium">Artist</p>
                  <p className="text-sm text-[#aaaaaa]">Michael Keenan</p>
                </div>
                <div>
                  <p className="text-white font-medium">Upload Date</p>
                  <p className="text-sm text-[#aaaaaa]">02/07/2025</p>
                </div>
              </div>
            </div>

            {/* Queue Section */}
            <div className="bg-[#1e1e1e] mt-4 p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-[#ffffff]">Next in queue</h3>
                <button className="text-sm font-medium text-[#aaaaaa] hover:text-[#ffffff] hover:underline cursor-pointer">Open queue</button>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src="https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36" // Replace with your actual track cover
                  alt="Closer"
                  className="w-12 h-12 rounded-[4px] object-cover"
                />
                <div className="truncate space-y-2">
                  <p className="text-[#ffffff] text-md font-medium leading-none">Closer</p>
                  <p className="text-[#aaaaaa] text-sm truncate leading-none">The Chainsmokers</p>
                </div>
              </div>
            </div>

          </div>
        </aside>
      </main>

      {/* Playback Controller */}
      <footer className={`bg-black px-4 py-4`}>
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-3 w-1/4 relative">
            <div className="relative group">
              <img
                src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                alt={'trackDetails.title'}
                className="w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded object-cover group-hover:opacity-70 transition-opacity"
              />

              <button className="absolute cursor-pointer text-gray-400 hover:text-white bg-black/50 rounded-full top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                <DownArrowIcon />
              </button>
            </div>

            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
                {'trackDetails.title'}
              </p>

              <p className="text-gray-400 text-xs truncate">{'trackDetails.artist'}</p>
            </div>

            <button className={`text-gray-400 hover:text-white cursor-pointer`}>
              <AddIcon width="17" height="17" />
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center space-x-6 mb-2 text-[#8f8f8f]">
              <button className="hover:text-[#ffffff] cursor-pointer"
                title="Enable Shuffle"
              >
                <ShuffleIcon width="16" height="16" />
              </button>
              <button className="hover:text-[#ffffff] cursor-pointer"
                title="Previous"
              >
                <PrevIcon width="16" height="16" />
              </button>
              <button
                className={`p-2 bg-white text-black rounded-full flex items-center justify-center transition-transform cursor-pointer`}
              >
                <PlayIcon width="16" height="16" />
              </button>
              <button className="hover:text-[#ffffff] cursor-pointer"
                title="Next"
              >
                <NextIcon width="16" height="16" />
              </button>
              <button className="hover:text-[#ffffff] cursor-pointer"
                title="Enable Repeat"
              >
                <RepeatIcon width="16" height="16" />
              </button>
            </div>
            <div className="flex items-center space-x-2 w-full max-w-md">
              <span className="text-xs text-gray-400">{"0:00"}</span>
              <Slider
                max={100}
                defaultValue={[0]}
                className={`cursor-grab w-full`}
              />
              <span className="text-xs text-gray-400">{"4:55"}</span>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4 text-[#8f8f8f] w-1/4 justify-end">
            {/* NowPlaying Icon */}
            <button className={`hidden lg:block hover:text-[#ffffff] cursor-pointer`}>
              <NowPlayingIcon width="16" height="16" />
            </button>

            {/* Queue Icon */}
            <button className={`hidden lg:block hover:text-[#ffffff] cursor-pointer`}
            >
              <QueueIcon width="16" height="16" />
            </button>

            {/* Volume Icon and Slider */}
            <HighVolumeIcon width="16" height="16" />

            <div className="w-20 h-1 rounded-full">
              <Slider
                defaultValue={[0]}
                // value={systemVolume}
                // onValueChange={handleVolumeChange}
                className={`cursor-grab w-full`}
              />
            </div>

            {/* miniPlyer Icon */}
            <button className={` hover:text-[#ffffff] cursor-pointer`}
            >
              <MiniPlayerIcon width="16" height="16" />
            </button>

            {/* Fullscreen Icon */}
            <button className={` hover:text-[#ffffff] cursor-pointer`}
            >
              <FullScreenIcon width="16" height="16" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

## Mobile Main Layout
import { Link, Outlet } from "react-router-dom";
import { AccountfilledIcon, AccountIcon, AddIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, PlayIcon, SearchFilledIcon, SearchIcon } from "../../Svgs";
import type { JSX } from "react";

export default function MobileMainLayout() {
    interface NavigationItem {
        path: string;
        name: string;
        Icon: JSX.Element;
        ActiveIcon: JSX.Element;
    }

    const NAVIGATION_ITEMS: NavigationItem[] = [
        {
            path: "/",
            name: "Home",
            Icon: <HomeIcon width="24" height="24" />,
            ActiveIcon: <HomeFilledIcon width="24" height="24" />,
        },
        {
            path: "/search",
            name: "Search",
            Icon: <SearchIcon width="24" height="24" />,
            ActiveIcon: <SearchFilledIcon width="24" height="24" />,
        },
        {
            path: "/myLibrary",
            name: "Library",
            Icon: <LibraryIcon width="24" height="24" />,
            ActiveIcon: <LibraryFilledIcon width="24" height="24" />,
        },
        {
            path: "",
            name: "Account",
            Icon: <AccountIcon width="26" height="26" />,
            ActiveIcon: <AccountfilledIcon width="26" height="26" />,
        },
    ];

    return (
        <div className="min-h-screen text-white relative bg-[#121212]">
            {/* Main Content */}
            <div className="mb-[125px] bg-[#121212]">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* Mobile Mini Player */}
            <div className="fixed bottom-[70px] left-0 w-full px-2 z-40 cursor-pointer animate-in slide-in-from-bottom duration-300 ease-out">
                <footer className={`rounded-sm w-full h-[57px] flex items-center justify-between px-4 shadow-md`}
                    style={{ background: '#3C3C3C' }}
                >
                    {/* Track Info */}
                    <div className="flex items-center min-w-0"> {/* min-w-0 allows truncation inside flex */}
                        <img
                            src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                            alt="Album Art"
                            className="w-[42px] h-[42px] rounded-sm mr-3 object-cover"
                        />
                        <div className="text-white min-w-0"> {/* min-w-0 required for truncation */}
                            <p className="text-sm font-bold leading-tight truncate">Save Your Tears</p>
                            <p className="text-sm text-gray-300 truncate">The Weeknd</p>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-6 text-white">
                        <button aria-label="Favorite" className="text-white/70 hover:text-white cursor-pointer">
                            <AddIcon />
                        </button>
                        <button aria-label="Play" className="cursor-pointer text-white">
                            <PlayIcon width="22" height="22" />
                        </button>
                    </div>
                </footer>
            </div>

            {/* Mobile Navigation Footer */}
            <footer className="fixed bottom-0 left-0 w-full h-[70px] bg-black/50 backdrop-blur-xs flex items-center justify-around z-50 shadow-md">
                {NAVIGATION_ITEMS.map((item) => {
                    const isAccount = item.name === "Account";
                    const isActive = location.pathname === item.path;

                    return !isAccount ? (
                        <Link
                            key={item.name}
                            to={item.path}
                        >
                            <div className={`flex flex-col items-center ${isActive ? "text-white" : "text-white/70"} active:scale-95  hover:text-white text-xs cursor-pointer`}>
                                {isActive ? (
                                    item.ActiveIcon
                                ) : (
                                    item.Icon
                                )}
                                <span className={`mt-1 text-[11px] ${isActive ? "font-medium" : "font-extralight"}`}>{item.name}</span>
                            </div>
                        </Link>
                    ) : (
                        <div
                            key={item.name}
                            className="flex flex-col items-center text-white/70 hover:text-white text-xs cursor-pointer"
                        >
                            {item.Icon}
                            <span className="mt-1 text-[11px] font-extralight">{item.name}</span>
                        </div>
                    );
                })}
            </footer>
        </div>
    )
}

## Now Playing
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="z-500"
        style={{ background: '#3C3C3C' }}
      >
        {/* in here */}
        <div className="h-screen w-full flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 text-white flex-shrink-0">
            <button className="cursor-pointer"
              onClick={onClose}
            >
              <DownArrowIcon width="24" height="24" />
            </button>
            <h1 className="text-xs font-medium">Now Playing</h1>
            <button className="cursor-pointer rotate-90 active:text-white/60">
              <MoreIcon width="24" height="24" />
            </button>
          </div>

          {/* Track Art */}
          <div className="flex-1 flex items-center justify-center px-6 py-2 min-h-0">
            <div className="w-full max-w-[18rem] aspect-square overflow-hidden">
              <img
                src={'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36'}
                alt="Album Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info */}
          <div className="px-6 py-2 flex items-center justify-between flex-shrink-0 w-full mb-4">
            <div className="flex flex-col flex-grow min-w-0">
              <h2 className="text-white text-xl font-bold mb-1 truncate">
                Save Your Tears
              </h2>
              <p className="text-white/70 text-md truncate">
                The Weekdn
              </p>
            </div>
            <button className="text-white/70 hover:text-white cursor-pointer flex-shrink-0 ml-4">
              <AddIcon />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-2 flex-shrink-0">
            <div className="w-full rounded-full h-1">
              <Slider
                defaultValue={[0]}
                className="w-full cursor-grab"
              />
            </div>
            <div className="flex items-center justify-between text-white/70 text-[12px] mt-1">
              <span>{"0:00"}</span>
              <span>{"4:55"}</span>
            </div>
          </div>

          {/* Track Controls */}
          <div className="px-6 py-3 flex-shrink-0">
            <div className="text-white flex items-center justify-between">
              <button className="cursor-pointer">
                <RepeatIcon width="23" height="23" />
              </button>
              <button className="cursor-pointer">
                <PrevIcon />
              </button>
              <button className="cursor-pointer p-5 bg-white text-black rounded-full"
              >
                <PlayIcon width="20" height="20" />
              </button>
              <button className="cursor-pointer">
                <NextIcon />
              </button>
              <button className="cursor-pointer">
                <TimerIcon width="28" height="28" />
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="px-6 pb-4 flex-shrink-0">
            <div className="text-white flex items-center justify-between">
              <button className="cursor-pointer text-white"
              >
                <HighVolumeIcon width="17" height="17" />
              </button>

              <button
                className="cursor-pointer text-white"
              >
                <ShareIcon width="17" height="17" />
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>

## Small Panel Library Item
 <>
            <div className="flex justify-center group">
                    <div className="p-2 hover:bg-[#1F1F1F] rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer">
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
                                <div className="p-2 hover:bg-[#1F1F1F] rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer">
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
        </>