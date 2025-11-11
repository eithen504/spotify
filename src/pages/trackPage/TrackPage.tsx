
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, MusicIcon, PlusIcon, AlreadyAddedToQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from "../../Svgs";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { useGetTrack, useUpdateTrack } from "../../hooks/track";
import { useDominantColor } from "../../hooks/color";
import type { Controls, Handlers, MenuOptions, Track } from "../../types";
import EntityHeader from "../../components/EntityHeader";
import EntityInfoSection from "../../components/EntityInfoSection";
import EntityControls from "../../components/EntityControls";
import Footer from "../../components/Footer";
import { NotFoundEntity } from "../../components/NotFounds";
import { TrackPageSkeleton } from "../../components/Skeletons";
import { useCheckAuth } from "../../hooks/auth";
import { useState } from "react";
import EditEntityDialog from "../../components/EditEntityDialog";
import { toast } from "sonner";
import { useLikeTrack, useTrackLikeStatus } from "../../hooks/like";
import { useAlbumStore } from "../../store/useAlbumStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useShare } from "../../hooks/share";
import AuthRequiredModal from "../../components/AuthRequiredModal";
import { useQueueStore } from "../../store/useQueueStore";
import { formatTotalAsHMS } from "../../utils";

/*---------- Constants ----------*/
const adminId = import.meta.env.VITE_ADMIN_ID;
const controls: Controls = {
    Play: true,
    Preview: false,
    Save: true,
    Share: true,
    Follow: false,
    More: true,
    View: false
};

const TrackPage = () => {
    /*---------- Internal Hooks ----------*/
    const { id } = useParams();
    const navigate = useNavigate();

    /* ----------Local States---------- */
    const [isEditTrackDialogOpen, setIsEditTrackDialogOpen] = useState(false);
    const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);

    /*----------Stores----------*/
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar } = preferences;
    const { panelSize: leftPanelSize } = leftSidebar;
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { albumData: { albumId, activeTrackId }, setAlbumData } = useAlbumStore();
    const { setPlaylistData } = usePlaylistStore();
    const { queueMap, addItemsToCustomQueue, removeItemFromQueue } = useQueueStore();

    /*----------Custom Hooks----------*/
    const { data: currentUser } = useCheckAuth();
    const { data: track, isLoading: isfetchingTrack } = useGetTrack(id || "");
    // const { data: suggestedTracks, isLoading: isfetchingSuggestedTracks } = useGetSuggestedTracks(id || "");
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { mutateAsync: updateTrack, isPending } = useUpdateTrack(id || "");
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();
    const imgUrl = track?.coverImageUrl || ""
    const { dominantColor } = useDominantColor(imgUrl);

    /*----------Derived Value----------*/
    const isOwnTrack = currentUser?._id == adminId;
    const isPlayingCurrentTrack = (track?.albumId == albumId && activeTrackId == id && id == trackDetails._id && trackDetails.isPlaying);

    const trackDuration = formatTotalAsHMS([track?.duration || 0]);
    const description = `Track . Spotify . ${trackDuration}`

    const hasLiked = getTrackLikeStatus({ hasLiked: track?.hasLiked || false, trackId: track?._id || "" });
    const queueItemid = `Album-${track?.albumId}-${track?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];

    const trackMenuOptions: MenuOptions = [
        {
            icon: <PlusIcon width="16" height="16" />,
            label: "Add To Playlist",
            action: () => { },
            rightSideIcon: <RightArrowIndicatorIcon width="12" height="12" />
        },
        {
            icon: hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: hasLiked ? "Remove From Your Liked Tracks" : "Save To Your Liked Tracks",
            action: () => {
                if (track) likeTrack(track);
            },
        },
        {
            icon: hasTrackInQueue ? <AlreadyAddedToQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: () => {
                if (!track) return;
                if (hasTrackInQueue) {
                    removeItemFromQueue("Album", track.albumId || "", track._id);
                } else {
                    addItemsToCustomQueue([track], "Album", track.albumId || "");
                }
            },
        },
        {
            icon: <ReportIcon width="16" height="16" />,
            label: "Report",
            action: () => { },
            hasTopBorder: true,
        },
        {
            icon: <AlbumIcon width="16" height="16" />,
            label: "Go To Album",
            action: () => {
                navigate(`/album/${track?.albumId}`);
            },
        },
        {
            icon: <CreditIcon width="16" height="16" />,
            label: "View Credits",
            action: () => { },
        },
        {
            icon: <ShareIcon width="16" height="16" />,
            label: "Share",
            action: () => {
                share(`/track/${id || ""}`)
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ]

    /*----------Methods Or Functions----------*/
    const handlePlayPauseTrack = (track: Track, isPlayingCurrentTrack: boolean) => {
        if (!currentUser) {
            setIsAuthRequiredModalOpen(true);
            return;
        }

        const isAlbumInitialized = albumId == track.albumId;

        if (!isAlbumInitialized) {
            setAlbumData({ activeTrackId: track._id, albumId: track.albumId || "" });

            setPlaylistData({ activeTrackId: "", playlistId: "" });

            setTrackDetails({
                ...track,
                isPlaying: true
            });

            return;
        }

        if (isPlayingCurrentTrack) {
            setTrackDetails({ isPlaying: false });
        } else {
            setTrackDetails({ isPlaying: true });
        }
    }

    const handleUpdateTrack = (payload: { title: string, coverImageUrl: string }) => {
        const { title, coverImageUrl } = payload;
        if (!title && !coverImageUrl) return toast.error("No Changes Detected!");

        updateTrack(payload);
    }

    const onEditTrack = () => {
        if (!isOwnTrack) return;
        setIsEditTrackDialogOpen(true);
    }

    const handlers: Handlers = {
        Play: () => {
            if (track) handlePlayPauseTrack(track, isPlayingCurrentTrack);
        },
        Preview: () => { },
        Save: () => {
            if (track) likeTrack(track);
        },
        Share: () => { },
        Follow: () => { },
        More: () => { },
        View: () => { },
    }

    if (isfetchingTrack) return <TrackPageSkeleton />;

    if (!isfetchingTrack && !track) return <NotFoundEntity title="Couldn't Find That Track" />;

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

            {/* Track Header */}
            <EntityHeader
                title={track?.title || ""}
                dominateColor={dominantColor || "#3C3C3C"}
                isPlayingCurrentEntity={isPlayingCurrentTrack}
                handlePlayEntity={handlers["Play"]}
            />

            {/* Track Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Track",
                        title: track?.title || "",
                        description,
                        placeholderIcon: <MusicIcon width="63" height="63" />,
                        isOwnEntity: isOwnTrack
                    }
                }
                dominateColor={dominantColor || "#3C3C3C"}
                onEditEntity={onEditTrack}
            />

            {/* Track Controls */}
            <EntityControls
                controls={controls}
                handlers={handlers}
                entity={{
                    title: track?.title || "",
                    imgUrl: track?.coverImageUrl,
                    hasSaved: hasLiked,
                    isPlaying: isPlayingCurrentTrack
                }}
                entityMenuOptions={trackMenuOptions}
                entityDrawerHeight="122"
            />

            <div className="relative max-w-[90rem] mx-auto">
                {/* Recommended section */}
                <div className="mb-4 px-4 md:px-6 mt-4">
                    <h2 className="text-xl font-bold">Recommended</h2>
                    <p className="text-sm text-gray-400">Based on this song</p>
                </div>

                {/* Recommended Tracks */}
                {/* <EntityTracks
                    tracks={suggestedTracks || []}
                    columns={columns}
                    view="Default List"
                    isPlayingCurrentEntity={isPlayingCurrentTrack}
                    handlePlayPause={handlePlayPause}
                /> */}
            </div>

            <Footer />

            {
                isAuthRequiredModalOpen && <AuthRequiredModal onClose={() => setIsAuthRequiredModalOpen(false)} imgUrl={imgUrl} />
            }

            {
                isEditTrackDialogOpen &&
                <EditEntityDialog
                    isOpen={isEditTrackDialogOpen}
                    onClose={() => setIsEditTrackDialogOpen(false)}
                    entity={{
                        defaultTitle: track?.title || "",
                        defaultImgUrl: imgUrl,
                        placeholderIcon: <MusicIcon width="63" height="63" />
                    }}
                    isPending={isPending}
                    handleUpdateEntity={handleUpdateTrack}
                />
            }
        </div>
    );
};

export default TrackPage;
