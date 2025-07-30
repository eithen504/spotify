import { useRef } from "react";
import { AddIcon, BrowseIcon, DefaultListIcon, ExpandIcon, HomeFilledIcon, LogoIcon, MoreIcon, PinIcon, PlusIcon, RightArrowIcon, SearchIcon, ShareIcon, UnCollapsedIcon } from "../../Svgs";
import { Link, Outlet } from "react-router-dom";

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
        <aside className="w-[320px] bg-[#121212] text-white rounded-md flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-1 px-5 py-3">
            <h2 className="text-white font-bold text-md">Your Library</h2>
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
          <div className="flex items-center justify-between mb-4 px-5">
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

          {/* Library Items */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-3 mb-4">
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

        <aside className="w-[260px] bg-[#121212] text-white group relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between relative flex-shrink-0 p-4 w-full">
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
          <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-4">
            {/* Track Art */}
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

            {/* Repeated content for scroll demo */}
            <div className="mt-8 bg-[#1e1e1e] p-4 rounded-md shadow-md">
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

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://i.scdn.co/image/ab67616d0000b2731444184f31d0a4c0c823dc3b"
            alt="Song"
            className="w-12 h-12 rounded"
          />
          <div>
            <div className="text-sm font-semibold">Play Date</div>
            <div className="text-xs text-gray-400">Melanie Martinez</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xl mb-1">▶️ ⏸️ ⏭️</div>
          <div className="w-full max-w-md h-1 bg-gray-600 rounded">
            <div className="h-1 bg-green-500 w-[1%] rounded"></div>
          </div>
          <div className="text-xs mt-1 flex justify-between w-full max-w-md">
            <span>0:01</span>
            <span>2:59</span>
          </div>
        </div>
        <div className="text-lg">🔊</div>
      </footer>
    </div>
  );
}