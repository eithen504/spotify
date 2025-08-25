import { useState } from "react";
import MainContent from "./_components/_mainContent/MainContent";
import NowPlaying from "./_components/_nowPlaying/NowPlaying";
import MobileMiniPlayer from "./_components/_mobileMiniPlayer/MobileMiniPlayer";
import MobileNavigationFooter from "./_components/_mobileNavigationFooter/MobileNavigationFooter";
import { useCheckAuth } from "../../hooks/auth";
import SignupBanner from "./_components/_signupBanner/SignupBanner";

export default function MobileMainLayout() {
    const [isNowPlayingDrawerOpen, setIsNowPlayingDrawerOpen] = useState(false);
    const { data: currentUser } = useCheckAuth();

    return (
        <div className="min-h-screen text-[#ffffff] relative bg-[#121212]">
            {/* Main Content */}
            <MainContent />

            {/* Now Playing */}
            <NowPlaying
                isOpen={isNowPlayingDrawerOpen}
                onClose={() => setIsNowPlayingDrawerOpen(false)}
            />

            {/* Mobile Mini Player */}
            {
                currentUser && <MobileMiniPlayer onOpen={() => setIsNowPlayingDrawerOpen(true)} />
            }

            {/* Conditional - Mobile Navigation Footer Or Signup Banner */}
            {currentUser ? <MobileNavigationFooter /> : <SignupBanner />}
        </div>
    );
}
