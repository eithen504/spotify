import Footer from "../../components/ui/footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import type { Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";
import DescriptionSection from "./_componenets/DescriptionSection";

const EpisodePage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    const imgUrl = "https://i.scdn.co/image/ab6765630000ba8adb02dd7e735e527d2937647c"
    const { dominantColor } = useDominantColor(imgUrl);

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
            <EntityHeader title="ChatGPT Brain Root Debate" dominateColor={dominantColor || ""} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Podcast Episode",
                        title: "ChatGPT Brain Root Debate",
                        description: "userxyz . 5 min"
                    }
                }
                dominateColor={dominantColor || ""}
            />

            {/* Playlist Controls */}
            <EntityControls controls={controls} />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Description Section */}
                <DescriptionSection/>
            </div>


            <Footer />
        </div>
    );
};

export default EpisodePage;
