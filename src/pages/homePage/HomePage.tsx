import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { HomePageSkeleton } from '../../components/Skeletons';
import { useGetFeedPlaylists, useGetRecentPlaylists } from '../../hooks/playlist';
import PlaylistSectionHeader from './components/PlaylistSectionHeader';
import PlaylistSectionItems from './components/PlaylistSectionItems';
import RecentItems from './components/RecentItems';
import TabsSection from './components/TabsSection';
import { useDominantColor } from '../../hooks/color';
import { useCheckAuth } from '../../hooks/auth';
import { type Playlist } from '../../types';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [playlistCoverImageUrl, setPlaylistCoverImageUrl] = useState("");
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const { data: currentUser } = useCheckAuth();
    const { data, isLoading: isFetchingFeedPlaylists } = useGetFeedPlaylists(page);
    const { data: recentPlaylists, isLoading: isFetchingRecentPlaylists } = useGetRecentPlaylists();

    const { dominantColor } = useDominantColor(playlistCoverImageUrl);

    // Split playlists into chunks of 8
    const chunkedPlaylists = [];
    for (let i = 0; i < playlists?.length; i += 8) {
        chunkedPlaylists.push(playlists?.slice(i, i + 8));
    }

    useEffect(() => {
        if (!Array.isArray(data)) return;

        setPlaylists([...playlists, ...data]);
    }, [data]);

    if ((isFetchingFeedPlaylists || isFetchingRecentPlaylists) && page == 1) return <HomePageSkeleton />;

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

            <div className="flex justify-center mt-8">
                <button
                    className="px-6 py-2 bg-[#353535] dynamic-bg-hover text-white rounded-full transition cursor-pointer"
                    style={{
                        '--bgHoverColor': '#4a4a4a',
                    } as React.CSSProperties}
                    onClick={() => setPage(page + 1)}
                >
                    {
                        (isFetchingFeedPlaylists && page != 1) ? "Loading More...": "Load More"
                    }
                </button>
            </div>

            <Footer />
        </div>
    )
}

export default HomePage;
