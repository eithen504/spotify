import { useEffect, useState } from "react";
import { useScrollStore } from "../../store/useScrollStore";
import { useParams } from "react-router-dom";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { formatTotalAsHMS, getScrollThreshold } from "../../utils";
import { useDominantColor } from "../../hooks/color";
import type { Controls, Handlers, MenuOptions, Playlist, Track, TrackMenuState } from "../../types";
import { NotFoundEntity, NotFoundTracks } from "../../components/NotFounds";
import EntityHeader from "../../components/EntityHeader";
import EntityInfoSection from "../../components/EntityInfoSection";
import EntityControls from "../../components/EntityControls";
import EntityTableHeader from "../../components/EntityTableHeader";
import Footer from "../../components/Footer";
import EntityTracks from "../../components/EntityTracks"
import { useGetAlbumTracks, useUpdateAlbum } from "../../hooks/album";
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, PlusIcon, AlreadyAddedToQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from "../../Svgs";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";
import EditEntityDialog from "../../components/EditEntityDialog";
import { useCheckAuth } from "../../hooks/auth";
import { toast } from "sonner";
import { useShare } from "../../hooks/share";
import { useAlbumStore } from "../../store/useAlbumStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useSaveAlbum } from "../../hooks/saveAlbum";
import PreviewEntityModal from "../../components/PreviewEntityModal";
import AuthRequiredModal from "../../components/AuthRequiredModal";
import { useQueueStore } from "../../store/useQueueStore";
import { useLikeTrack, useTrackLikeStatus } from "../../hooks/like";
import { useGetCurrentUserLibraryItems } from "../../hooks/library";
import { useAddItemsToPlaylist, useUploadPlaylist } from "../../hooks/playlist";
import SearchForEntity from "../../components/SearchForEntity";
import { AlbumPageSkeleton } from "../../components/Skeletons";
import EntityImageDialog from "../../components/EntityImageDialog";
import TrackCreditsDialog from "../../components/TrackCreditsDialog";
import { useTableColumnVisibilityStore } from "../../store/useTableColumnVisibilityStore";

/* ---------- Constants ---------- */
const adminId = import.meta.env.VITE_ADMIN_ID
const controls: Controls = {
    Play: true,
    Preview: true,
    Save: true,
    Share: true,
    Follow: false,
    More: true,
    View: true
};

const AlbumPage = () => {
    /* ---------- Internal Hooks ---------- */
    const { id } = useParams();

    /* ---------- Local States ---------- */
    const [trackMenu, setTrackMenu] = useState<TrackMenuState>({
        isOpen: false,
        track: null
    });
    const [isEditAlbumDialogOpen, setIsEditAlbumDialogOpen] = useState(false);
    const [isAlbumImageDialogOpen, setIsAlbumImageDialogOpen] = useState(false);
    const [isPreviewAlbumModalOpen, setIsPreviewAlbumModalOpen] = useState(false);
    const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
    const [isTrackCreditsDialogOpen, setIsTrackCreditsDialogOpen] = useState(false);
    const [albumTableColumnOptions, setAlbumTableColumnOptions] = useState<MenuOptions>([])

    /* ---------- Stores ---------- */
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { albumData: { albumId, activeTrackId, playImmediate }, setAlbumData } = useAlbumStore();
    const { setPlaylistData } = usePlaylistStore();
    const { queueMap, initializeEntityQueue, addItemsToCustomQueue, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { tableView, albumTableColumns, toggleAlbumTableColumn } = useTableColumnVisibilityStore();
    const { scrollFromTop } = useScrollStore();

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { data, isLoading } = useGetAlbumTracks(id || "");
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { mutateAsync: updateAlbum, isPending } = useUpdateAlbum(id || "");
    const { mutateAsync: saveAlbum } = useSaveAlbum();
    const { mutateAsync: uploadPlaylist } = useUploadPlaylist();
    const { mutateAsync: addItemsToPlaylist } = useAddItemsToPlaylist();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();
    const imgUrl = data?.album?.coverImageUrl;
    const { dominantColor } = useDominantColor(imgUrl);

    /* ---------- Derived Value ---------- */
    const isOwnAlbum = currentUser?._id == adminId;
    const showFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const isPlayingCurrentAlbum = (albumId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying);

    const secondsArray = data?.tracks?.map((t: Track) => t.duration);
    const albumLength = `${data?.tracks?.length} Tracks`
    const albumDuration = formatTotalAsHMS(secondsArray || [])
    const description = `Spotify . ${albumLength} . ${albumDuration}`;

    const { track: currentMenuTrack } = trackMenu;
    const hasLiked = getTrackLikeStatus({ hasLiked: currentMenuTrack?.hasLiked || false, trackId: currentMenuTrack?._id || "" });
    const queueItemId = `Album-${id}-${currentMenuTrack?._id}`;
    const hasTrackInQueue = queueMap[queueItemId];

    const albumMenuOptions: MenuOptions = [
        {
            icon: data?.album?.hasSaved ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: data?.album?.hasSaved ? "Remove From Your Library" : "Add To Your Library",
            action: () => {
                saveAlbum(data.album);
            },
        },
        {
            icon: <AddToQueueIcon width="16" height="16" />,
            label: "Add To Queue",
            action: () => {
                const entityType = "Album";
                const entityId = id;

                addItemsToCustomQueue(data.tracks, entityType, entityId || "");
            },
        },
        {
            icon: <ReportIcon width="16" height="16" />,
            label: "Report",
            action: () => { },
        },
        {
            icon: <PlusIcon width="16" height="16" />,
            label: "Add To Playlist",
            action: () => { },
            rightSideIcon: <RightArrowIndicatorIcon width="12" height="12" />,
            hasTopBorder: true,
            subMenu: [
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: "Create Playlist",
                    action: () => {
                        const tracks = data.tracks.map((t: Track) => t._id);
                        uploadPlaylist({
                            title: `New Playlist ${Date.now()}`,
                            coverImageUrl: "",
                            genres: [],
                            tracks,
                            visibility: "Public"
                        });
                    }
                },
                ...(Array.isArray(playlists)
                    ? playlists.map((playlist: Playlist) => ({
                        label: playlist.title,
                        action: () => {
                            addItemsToPlaylist({
                                playlistId: playlist._id,
                                tracks: data.tracks
                            })
                        }
                    }))
                    : [])
            ]
        },
        {
            icon: <ShareIcon width="16" height="16" />,
            label: "Share",
            action: () => {
                share(`/album/${id || ""}`);
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ]

    const trackMenuOptions: MenuOptions = [
        {
            icon: <PlusIcon width="16" height="16" />,
            label: "Add To Playlist",
            action: () => { },
            rightSideIcon: <RightArrowIndicatorIcon width="12" height="12" />,
            subMenu: [
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: "Create Playlist",
                    action: () => {
                        if (!currentMenuTrack) return;

                        uploadPlaylist({
                            title: `New Playlist ${Date.now()}`,
                            coverImageUrl: "",
                            genres: [],
                            tracks: [currentMenuTrack._id],
                            visibility: "Public"
                        });
                    }
                },
                ...(Array.isArray(playlists)
                    ? playlists.map((playlist: Playlist) => ({
                        label: playlist.title,
                        action: () => {
                            if (!currentMenuTrack) return;

                            addItemsToPlaylist({
                                playlistId: playlist._id,
                                tracks: [currentMenuTrack],
                            })
                        }
                    }))
                    : [])
            ]
        },
        {
            icon: hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: hasLiked ? "Remove From Your Liked Tracks" : "Save To Your Liked Tracks",
            action: () => {
                if (currentMenuTrack) likeTrack(currentMenuTrack);
            },
        },
        {
            icon: hasTrackInQueue ? <AlreadyAddedToQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: () => {
                if (!currentMenuTrack) return;

                const entityType = "Album";
                const entityId = id;
                const trackId = currentMenuTrack._id;

                if (hasTrackInQueue) {
                    removeItemFromQueue(entityType, entityId || "", trackId);
                } else {
                    addItemsToCustomQueue([currentMenuTrack], entityType, entityId || "");
                }
            },
        },
        {
            icon: <ReportIcon width="16" height="16" />,
            label: "Report",
            action: () => { },
            hasTopBorder: true
        },
        {
            icon: <CreditIcon width="16" height="16" />,
            label: "View Credits",
            action: () => {
                setIsTrackCreditsDialogOpen(true);
            },
        },
        {
            icon: <ShareIcon width="16" height="16" />,
            label: "Share",
            action: () => {
                share(`/track/${currentMenuTrack?._id || ""}`);
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ]

    /* ---------- Methods Or Functions ---------- */
    const handlePlayPauseTrack = (track: Track, isPlayingCurrentTrack: boolean, source?: "PlayButton" | "EntityTracks") => {
        if (!currentUser) {
            setIsAuthRequiredModalOpen(true);
            return;
        }

        const isAlbumInitialized = albumId == id;
        console.log("albumid", id);


        if (!isAlbumInitialized) {
            setAlbumData({ activeTrackId: track._id, albumId: id || "" });

            setPlaylistData({ activeTrackId: "", playlistId: "" });

            setTrackDetails({
                ...track,
                isPlaying: true
            });

            initializeEntityQueue(data.tracks, "Album", id || "", data.album.title);
            setActiveEntityQueueListNode("Album", id || "", track._id);
            return;
        }

        if (isPlayingCurrentTrack) {
            setTrackDetails({ isPlaying: false });
        } else {
            if (source == "PlayButton") {
                setTrackDetails({ isPlaying: true });
            } else {
                setTrackDetails({
                    ...track,
                    isPlaying: true
                });

                setAlbumData({ activeTrackId: track._id });
                setActiveEntityQueueListNode("Album", id || "", track._id);
            }
        }
    }

    const handleUpdateAlbum = (payload: { title: string, coverImageUrl: string }) => {
        const { title, coverImageUrl } = payload;
        if (!title && !coverImageUrl) return toast.error("No Changes Detected!");

        updateAlbum(payload);
    }

    const onAlbumImageClick = () => {
        if (isOwnAlbum) {
            setIsEditAlbumDialogOpen(true);
        } else {
            setIsAlbumImageDialogOpen(true);
        }
    }

    const handlers: Handlers = {
        Play: () => {
            if (data && data.tracks) handlePlayPauseTrack(data.tracks[0], isPlayingCurrentAlbum, "PlayButton");
        },
        Preview: () => {
            if (!currentUser) {
                setIsAuthRequiredModalOpen(true);
                return;
            }

            setIsPreviewAlbumModalOpen(true);
            setTrackDetails({ isPlaying: false });
        },
        Save: () => {
            saveAlbum(data.album);
        },
        Share: () => {
            share(`/album/${id}`);
        },
        Follow: () => { },
        More: () => { },
        View: () => { },
    }

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        if (tableView == "Compact List") {
            setAlbumTableColumnOptions([
                {
                    label: "Artist",
                    action: () => {
                        toggleAlbumTableColumn("ARTIST");
                    }
                },
                {
                    label: "Duration",
                    action: () => {
                        toggleAlbumTableColumn("DURATION");
                    }
                }
            ])
        } else {
            setAlbumTableColumnOptions([
                {
                    label: "Duration",
                    action: () => {
                        toggleAlbumTableColumn("DURATION");
                    }
                }
            ])
        }
    }, [tableView])

    useEffect(() => {
        if (isLoading || !data || !data?.tracks || data?.tracks?.length == 0) return;

        if (playImmediate) {
            handlers["Play"]();
        }
    }, [playImmediate, isLoading, id])

    if (isLoading) return <AlbumPageSkeleton />;

    if (!isLoading && !data) return <NotFoundEntity title="Couldn't Find That Album" />;

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

            {/* Album Header */}
            <EntityHeader
                title={data.album.title}
                dominateColor={dominantColor || "#3C3C3C"}
                isPlayingCurrentEntity={isPlayingCurrentAlbum}
                handlePlayEntity={handlers["Play"]}
            />

            {/* Album Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Album",
                        title: data.album.title,
                        description,
                        placeholderIcon: <AlbumIcon width="63" height="63" />,
                        isOwnEntity: isOwnAlbum
                    }
                }
                dominateColor={dominantColor || "#3C3C3C"}
                onEntityImageClick={onAlbumImageClick}
            />

            {
                data.tracks.length > 0 ? (
                    <>
                        {/* album Controls */}
                        <EntityControls
                            controls={controls}
                            handlers={handlers}
                            entity={{
                                title: data.album.title,
                                imgUrl,
                                hasSaved: data.album.hasSaved,
                                isPlaying: isPlayingCurrentAlbum
                            }}
                            entityMenuOptions={albumMenuOptions}
                            entityDrawerHeight="381px"
                        />

                        <div className="relative max-w-[90rem] mx-auto">
                            {/* album Table Header */}
                            <EntityTableHeader
                                tableColumns={albumTableColumns}
                                options={albumTableColumnOptions}
                            />

                            {/* Seperator Line */}
                            <div className={`${showFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                                <div className="w-full h-[1px] bg-white/10 " />
                            </div>

                            {/* album Tracks */}
                            <EntityTracks
                                tracks={data.tracks}
                                tableColumns={albumTableColumns}
                                isPlayingCurrentEntity={isPlayingCurrentAlbum}
                                trackMenuOptions={trackMenuOptions}
                                entityDrawerHeight="429px"
                                trackMenu={trackMenu}
                                setTrackMenu={setTrackMenu}
                                handlePlayPauseTrack={handlePlayPauseTrack}
                            />
                        </div>
                    </>
                ) : (
                    isOwnAlbum ?
                        <SearchForEntity title="Let's find something for your album" />
                        :
                        <NotFoundTracks title="No Tracks Added For This Album" />
                )
            }

            <Footer />

            {
                isAuthRequiredModalOpen && <AuthRequiredModal onClose={() => setIsAuthRequiredModalOpen(false)} imgUrl={imgUrl} />
            }

            {
                isEditAlbumDialogOpen &&
                <EditEntityDialog
                    isOpen={isEditAlbumDialogOpen}
                    onClose={() => setIsEditAlbumDialogOpen(false)}
                    entity={{
                        defaultTitle: data?.album?.title || "",
                        defaultImgUrl: imgUrl,
                        placeholderIcon: <AlbumIcon width="63" height="63" />
                    }}
                    isPending={isPending}
                    handleUpdateEntity={handleUpdateAlbum}
                />
            }

            {
                isAlbumImageDialogOpen &&
                <EntityImageDialog
                    imageUrl={imgUrl}
                    onClose={() => setIsAlbumImageDialogOpen(false)}
                />
            }

            {
                isPreviewAlbumModalOpen && (
                    <PreviewEntityModal
                        tracks={data.tracks}
                        onClose={() => setIsPreviewAlbumModalOpen(false)}
                    />
                )
            }

            {
                isTrackCreditsDialogOpen && (
                    <TrackCreditsDialog
                        track={currentMenuTrack}
                        onClose={() => setIsTrackCreditsDialogOpen(false)}
                    />
                )
            }

        </div>
    );
};

export default AlbumPage;
