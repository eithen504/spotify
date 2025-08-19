import { useEffect, useState } from "react";
import Footer from "../../components/ui/footer";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { getScrollThreshold } from "../../utils";
import type { Column, Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";
import EntityTableHeader from "../../components/ui/EntityTableHeader";
import EntityTracks from "../../components/ui/EntityTracks";

const CollectionTracksPage = () => {
    const { scrollFromTop } = useScrollStore();
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [view, setView] = useState<"Compact List" | "Default List">("Default List")

    const showFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);

    const imgUrl = "https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
    const { dominantColor } = useDominantColor(imgUrl);

    const [columns, setColumns] = useState<Record<Column, boolean>>({
        "Artist": true,
        "Album": true,
        "Duration": true,
        "Date added": false,
    });

    const controls: Controls = {
        Play: true,
        Preview: false,
        Save: false,
        Share: false,
        More: false,
        View: true,
    };

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
                    backgroundImage: `linear-gradient(to bottom, ${dominantColor}, #121212)`
                }}
            />

            {/* Playlist Header */}
            <EntityHeader title="Liked Tracks" dominateColor={dominantColor || ""} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Private Playlist",
                        title: "Liked Tracks",
                        description: "userxyz . 15 Tracks . 2 hr 15 min"
                    }
                }
                dominateColor={dominantColor || ""}
            />

            {/* Playlist Controls */}
            <EntityControls
                controls={controls}
                view={view}
                setView={setView}
            />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Playlist Table Header */}
                <EntityTableHeader
                    view={view}
                    columns={columns}
                    setColumns={setColumns}
                />

                {/* Seperator Line */}
                <div className={`${showFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                    <div className="w-full h-[1px] bg-white/10 " />
                </div>

                {/* Playlist Tracks */}
                <EntityTracks view={view} columns={columns} />
            </div>

            <Footer />
        </div>
    );
};

export default CollectionTracksPage;
