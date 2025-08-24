import Footer from "../../components/ui/footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import type { Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";
import AboutSection from "./_components/AboutSection";
import PodcastEpisodes from "./_components/PodcastEpisodes";

const PodcastPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    
    const imgUrl = "https://i.scdn.co/image/ab6765630000ba8adb02dd7e735e527d2937647c";
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
            <EntityHeader title="The Diary Of A CEO" dominateColor={dominantColor || ""} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={{
                    imgUrl,
                    displayType: "Podcast",
                    title: "The Diary Of A CEO",
                    description: "userxyz . 5 min"
                }}
                dominateColor={dominantColor || ""}
            />

            {/* Playlist Controls */}
            <EntityControls controls={controls} />

            <div className="relative max-w-[90rem] mx-auto">
                {/* About Section */}
               <AboutSection/>

               {/* Podcast Episodes */}
               <PodcastEpisodes/>
            </div>

            <Footer />
        </div>
    );
};

export default PodcastPage;
