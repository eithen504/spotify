import Footer from "../../components/ui/footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import type { Controls } from "../../Types";
import EntityHeader from "../../components/ui/EntityHeader";
import EntityInfoSection from "../../components/ui/EntityInfoSection";
import useDominantColor from "../../hooks/useDominateColor";
import EntityControls from "../../components/ui/EntityControls";
import EntityTracks from "../../components/ui/EntityTracks";
import { useGetSuggestedTracks, useGetTrack } from "../../hooks/track";
import { useParams } from "react-router-dom";
import { TrackPageSkeleton } from "../../components/ui/Skeletons";
import NotFoundPage from "../../components/ui/NotFoundPage";
import { MusicIcon } from "../../Svgs";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";

const TrackPage = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { trackDetails, setTrackDetails } = useTrackDetailsStore()

    const { id } = useParams();

    const { data: track, isLoading: isfetchingTrack } = useGetTrack(id || "")
    const { data: suggestedTracks, isLoading: isfetchingSuggestedTracks } = useGetSuggestedTracks()

    const imgUrl = track?.coverImageUrl
    const { dominantColor } = useDominantColor(imgUrl);

    const columns = {
        "Artist": false,
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

    const handlePlayPause = () => {
        const isPlayingCurrentSong = trackDetails.isPlaying && track._id == trackDetails._id

        if (isPlayingCurrentSong) {
            setTrackDetails({ isPlaying: false })
        } else {
            setTrackDetails({
                _id: track._id,
                title: track.title,
                coverImageUrl: track.coverImageUrl,
                audioUrl: track.audioUrl,
                artist: track.artist,
                duration: track.duration,
                albumId: track.albumId,
                albumName: track.albumName,
                hasLiked: track.hasLiked,
                isPlaying: true
            })
        }
    }

    console.log("tracxj", trackDetails);
    
    if (isfetchingTrack || isfetchingSuggestedTracks) return <TrackPageSkeleton />

    if (!isfetchingTrack && !track) return <NotFoundPage title="Couldn't find that song" />

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Background gradient */}
            <div
                className={`w-full absolute inset-0 mt-90 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:mt-64" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:mt-47" : "md:mt-52"} h-[700px] opacity-70`}
                style={{
                    height: '250px',
                    backgroundImage: `linear-gradient(to bottom, ${dominantColor || "#3C3C3C"}, #121212)`
                }}
            />

            {/* Playlist Header */}
            <EntityHeader title="Perfect" dominateColor={dominantColor || "#3C3C3C"} />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Track",
                        title: track?.title,
                        description: "Spotify . 5 min"
                    }
                }
                dominateColor={dominantColor || "#3C3C3C"}
                placeHolderIcon={<MusicIcon width="80" height="80" />}
            />

            {/* Playlist Controls */}
            <EntityControls
                controls={controls}
                handlePlayPause={handlePlayPause}
            />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Recommended section */}
                <div className="mb-4 px-4 md:px-6 mt-4">
                    <h2 className="text-xl font-bold">Recommended</h2>
                    <p className="text-sm text-gray-400">Based on this song</p>
                </div>

                {/* Playlist Tracks */}
                <EntityTracks tracks={suggestedTracks} view="Default List" columns={columns} />
            </div>

            <Footer />
        </div>
    );
};

export default TrackPage;
