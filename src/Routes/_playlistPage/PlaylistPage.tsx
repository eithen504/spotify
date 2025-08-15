import Footer from "../../components/ui/footer";
import { useScrollStore } from "../../store/useScrollStore";
import PlaylistControls from "./_components/PlaylistControls";
import PlaylistHeader from "./_components/PlaylistHeader";
import PlaylistInfoSection from "./_components/PlaylistInfoSection";
import PlaylistTableHeader from "./_components/PlaylistTableHeader";
import PlaylistTracks from "./_components/PlaylistTracks";

const PlaylistPage = () => {
    const { scrollFromTop } = useScrollStore();

    return (
        <div className="relative text-white min-h-screen">
            {/* Background gradient */}
            <div
                className="w-full absolute inset-0 z-0 h-[700px] mt-64 opacity-70"
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
                <div className={`${scrollFromTop >= 296 ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full z-10 mb-3`}>
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
