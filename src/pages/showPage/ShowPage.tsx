import { useUIPreferencesStore } from '../../store/useUIPreferenceStore'
import EntityHeader from '../../components/EntityHeader';
import Footer from '../../components/Footer';
import EntityInfoSection from '../../components/EntityInfoSection';
import { PlaylistIcon } from '../../Svgs';
import UserPlaylistsSection from './UserPlaylistsSection';
import AboutSection from './AboutSection';
import TabsSection from './TabsSection';
import { useState } from 'react';
import type { Visibility } from '../../types';

const ShowPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [activeTab, setActiveTab] = useState<Visibility>("All");

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 mt-90 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:mt-47" : "md:mt-52"} h-[700px] opacity-70`}
                style={{
                    height: '250px',
                    backgroundImage: `linear-gradient(to bottom, ${"#3C3C3C"}, #121212)`
                }}
            />

            <EntityHeader
                title={"title"}
                dominateColor={"#3C3C3C"}
                isPlayingCurrentEntity={false}
                handlePlayEntity={() => { }}
            />

            <EntityInfoSection
                entity={
                    {
                        imgUrl: "",
                        displayType: "Public Playlist",
                        title: "data.playlist.title",
                        description: "decececec",
                        placeholderIcon: <PlaylistIcon width="63" height="63" />,
                        isOwnEntity: true
                    }
                }
                dominateColor={"#3C3C3C"}
                onEditEntity={() => { }}
            />

            <div className="relative max-w-[90rem] mx-auto">
                {/* About Section */}
                <AboutSection />

                {/* Tabs Section */}
                <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />

                {/* User Playlists Section */}
                <UserPlaylistsSection />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ShowPage