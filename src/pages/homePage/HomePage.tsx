import { useState } from 'react';
import Footer from '../../components/Footer';
import { HomePageSkeleton } from '../../components/Skeletons';
import { useGetFeedPlaylists, useGetRecentPlaylists } from '../../hooks/playlist';
import PlaylistSectionHeader from './components/PlaylistSectionHeader';
import PlaylistSectionItems from './components/PlaylistSectionItems';
import RecentItems from './components/RecentItems';
import TabsSection from './components/TabsSection';
import { useDominantColor } from '../../hooks/color';
import { useCheckAuth } from '../../hooks/auth';

const HomePage = () => {
    const { data: currentUser } = useCheckAuth();
    const { data: playlists, isLoading: isFetchingFeedPlaylists } = useGetFeedPlaylists();
    const { data: recentPlaylists, isLoading: isFetchingRecentPlaylists } = useGetRecentPlaylists();
    const [playlistCoverImageUrl, setPlaylistCoverImageUrl] = useState("");

    const { dominantColor } = useDominantColor(playlistCoverImageUrl);

    // Split playlists into chunks of 8
    const chunkedPlaylists = [];
    for (let i = 0; i < playlists?.length; i += 8) {
        chunkedPlaylists.push(playlists?.slice(i, i + 8));
    }

    if (true) return <HomePageSkeleton />;

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            <div
                className="w-full absolute inset-0 z-0 h-[700px]"
                style={{
                    height: '250px',
                    opacity: 1,
                    backgroundImage: `linear-gradient(to bottom, ${dominantColor || "#3C3C3C"}, #121212)`
                }}
            />

            {/* Tabs Section */}
            <TabsSection background={dominantColor || "#3C3C3C"} />
 
            {/* Recent Items */}
            {
                currentUser && <RecentItems playlists={recentPlaylists} setPlaylistCoverImageUrl={setPlaylistCoverImageUrl} />
            }
 
            <div className={`${currentUser ? "pt-3" : "pt-16"} md:pt-0`}>
                {chunkedPlaylists.map((chunk, idx) => (
                    <div
                        key={idx}
                        className="pt-7 md:pt-10 relative max-w-[90rem] mx-auto"
                    >
                        {/* PlaylistSection Header */}
                        <PlaylistSectionHeader title="Good Morning" />

                        {/* PlaylistSection Items */}
                        <PlaylistSectionItems playlists={chunk} />
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}

export default HomePage;
