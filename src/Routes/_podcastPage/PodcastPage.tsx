import Footer from "../../components/ui/footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import type { Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";

const PodcastPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    const imgUrl = "https://i.scdn.co/image/ab6765630000ba8adb02dd7e735e527d2937647c"
    const { dominantColor } = useDominantColor(imgUrl);

    const controls: Controls = {
        Play: false,
        Preview: false,
        Save: false,
        Share: false,
        Follow: true,
        More: true,
        View: false
    };

    return (
        <div className="relative text-white min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 mt-90 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:mt-47" : "md:mt-52"} h-[700px] opacity-70`}
                style={{
                    height: '250px',
                    backgroundImage: `linear-gradient(to bottom, ${dominantColor}, #121212)`
                }}
            />

            {/* Playlist Header */}
            <EntityHeader title="The Diary Of A CEO" dominateColor={dominantColor || ""} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Podcast",
                        title: "The Diary Of A CEO",
                        description: "userxyz . 5 min"
                    }
                }
                dominateColor={dominantColor || ""}
            />

            {/* Playlist Controls */}
            <EntityControls controls={controls} />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Description Section */}
                <div className="mb-4 px-4 md:px-6 mt-4">
                    <h2 className="text-xl font-bold mb-4">Description</h2>
                    <p className="text-gray-300 leading-relaxed line-clamp-3">
                        MIT just announced that AI is rotting your brain?! Two world-leading
                        experts break this study down and reveal how AI and ChatGPT could
                        silently shrink your brain, kill creativity, and wreck your memory.
                    </p>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default PodcastPage;
