import { useEffect, useState } from "react";
import Footer from "../../components/ui/footer";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { getScrollThreshold } from "../../utils";
import PlaylistControls from "./_components/PlaylistControls";
import PlaylistHeader from "./_components/PlaylistHeader";
import PlaylistInfoSection from "./_components/PlaylistInfoSection";
import PlaylistTableHeader from "./_components/PlaylistTableHeader";
import PlaylistTracks from "./_components/PlaylistTracks";
import type { Column } from "../../Types";

const PlaylistPage = () => {
    const { scrollFromTop } = useScrollStore();
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [view, setView] = useState<"Compact List" | "Default List">("Default List")

    const shouldShowFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);

    const [columns, setColumns] = useState<Record<Column, boolean>>({
        "Artist": true,
        "Album": true,
        "Duration": true,
        "Date added": false,
    });

    useEffect(() => {
        if (view == "Default List") {
            setColumns({
                "Artist": false,
                "Album": true,
                "Duration": true,
                "Date added": true,
            })
        } else {
            setColumns({
                "Artist": true,
                "Album": true,
                "Duration": true,
                "Date added": false,
            })
        }
    }, [view])

    return (
        <div className="relative text-white min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 mt-90 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:mt-47" : "md:mt-52"} h-[700px] opacity-70`}
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
            <PlaylistControls view={view} setView={setView} />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Playlist Table Header */}
                <PlaylistTableHeader view={view} columns={columns} setColumns={setColumns} />

                {/* Seperator Line */}
                <div className={`${shouldShowFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                    <div className="w-full h-[1px] bg-white/10 " />
                </div>

                {/* Playlist Tracks */}
                <PlaylistTracks view={view} columns={columns} />
            </div>

            <Footer />
        </div>
    );
};

export default PlaylistPage;
