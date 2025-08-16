import Footer from "../../components/ui/footer";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { getScrollThreshold } from "../../utils";
import PlaylistControls from "./_components/PlaylistControls";
import PlaylistHeader from "./_components/PlaylistHeader";
import PlaylistInfoSection from "./_components/PlaylistInfoSection";
import PlaylistTableHeader from "./_components/PlaylistTableHeader";
import PlaylistTracks from "./_components/PlaylistTracks";

const PlaylistPage = () => {
    const { scrollFromTop } = useScrollStore();
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();


    const shouldShowFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);

    return (
        <div className="relative text-white min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 z-0 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "mt-47" : "mt-52"} h-[700px] opacity-70`}
                style={{
                    height: '250px',
                    backgroundImage: `linear-gradient(to bottom, #2D2453, #121212)`
                }}
            />

            {/* Playlist Header */}
            <PlaylistHeader />

            {/* Playlist Info Section */}
            <PlaylistInfoSection />

            {/* Playlist Controls */}
            <PlaylistControls />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Playlist Table Header */}
                <PlaylistTableHeader />

                {/* Seperator Line */}
                <div className={`${shouldShowFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                    <div className="w-full h-[1px] bg-white/10 " />
                </div>

                {/* Playlist Tracks */}
                <PlaylistTracks />
            </div>

            <Footer />
        </div>
    );
};

export default PlaylistPage;
