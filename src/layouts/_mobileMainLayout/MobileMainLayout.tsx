
import { useState } from "react";
import MainContent from "./_components/_mainContent/MainContent";
import NowPlaying from "./_components/_nowPlaying/NowPlaying";
import MobileMiniPlayer from "./_components/_mobileMiniPlayer/MobileMiniPlayer";
import MobileNavigationFooter from "./_components/_mobileNavigationFooter/MobileNavigationFooter";

export default function MobileMainLayout() {
    const [isNowPlayingDrawerOpen, setIsNowPlayingDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen text-white relative bg-[#121212]">
            {/* Main Content */}
            <MainContent />

            {/* Now Playing */}
            <NowPlaying isOpen={isNowPlayingDrawerOpen} onClose={() => setIsNowPlayingDrawerOpen(false)} />

            {/* Mobile Mini Player */}
            <MobileMiniPlayer onOpen={() => setIsNowPlayingDrawerOpen(true)} />

            {/* Mobile Navigation Footer */}
            <MobileNavigationFooter />
        </div>
    )
}
