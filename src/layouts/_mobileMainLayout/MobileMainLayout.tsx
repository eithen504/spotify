import { useState, useEffect } from "react";
import MainContent from "./_components/_mainContent/MainContent";
import NowPlaying from "./_components/_nowPlaying/NowPlaying";
import MobileMiniPlayer from "./_components/_mobileMiniPlayer/MobileMiniPlayer";
import MobileNavigationFooter from "./_components/_mobileNavigationFooter/MobileNavigationFooter";
import { useScrollStore } from "../../store/useScrollStore";
import { useLocation } from "react-router-dom";

export default function MobileMainLayout() {
    const {pathname} = useLocation();
    const [isNowPlayingDrawerOpen, setIsNowPlayingDrawerOpen] = useState(false);
    const { setIsScrolled, setScrollFromTop } = useScrollStore();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // Correct property
            setIsScrolled(scrollTop > 0);
            setScrollFromTop(scrollTop); // Now updates correctly
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            <MobileMiniPlayer onOpen={() => setIsNowPlayingDrawerOpen(true)} />

            {/* Mobile Navigation Footer */}
            <MobileNavigationFooter />
        </div>
    );
}
