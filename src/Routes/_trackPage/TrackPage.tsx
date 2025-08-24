import Footer from "../../components/ui/footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import type { Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";
import EntityTracks from "../../components/ui/EntityTracks";

const TrackPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    const imgUrl = "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
    const { dominantColor } = useDominantColor(imgUrl);

    const columns = {
        "Artist": true,
        "Album": false,
        "Duration": true, 
        "Date added": false,
    }

    const controls: Controls = {
        Play: true,
        Preview: false,
        Save: true,
        Share: true,
        Follow: false,
        More: true,
        View: false
    };

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 mt-90 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:mt-47" : "md:mt-52"} h-[700px] opacity-70`}
                style={{
                    height: '250px',
                    backgroundImage: `linear-gradient(to bottom, ${dominantColor}, #121212)`
                }}
            />

            {/* Playlist Header */}
            <EntityHeader title="Perfect" dominateColor={dominantColor || ""} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Track",
                        title: "Perfect",
                        description: "Spotify . 5 min"
                    }
                }
                dominateColor={dominantColor || ""}
            />

            {/* Playlist Controls */}
            <EntityControls controls={controls} />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Recommended section */}
                <div className="mb-4 px-4 md:px-6 mt-4">
                    <h2 className="text-xl font-bold">Recommended</h2>
                    <p className="text-sm text-gray-400">Based on this song</p>
                </div>

                {/* Playlist Tracks */}
                <EntityTracks view="Default List" columns={columns} />
            </div>

            <Footer />
        </div>
    );
};

export default TrackPage;
