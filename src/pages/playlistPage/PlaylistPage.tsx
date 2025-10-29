import { useEffect, useState } from "react";
import { useScrollStore } from "../../store/useScrollStore";
import { useNavigate, useParams } from "react-router-dom";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { useAddItemsToPlaylist, useGetPlaylistTracks, useUpdatePlaylist, useUploadPlaylist } from "../../hooks/playlist";
import { formatTotalAsHMS, getScrollThreshold } from "../../utils";
import { useDominantColor } from "../../hooks/color";
import type { Columns, Controls, Folder, Handlers, MenuOptions, Playlist, Track } from "../../types";
import { NotFoundEntity, NotFoundTracks } from "../../components/NotFounds";
import EntityHeader from "../../components/EntityHeader";
import EntityInfoSection from "../../components/EntityInfoSection";
import EntityControls from "../../components/EntityControls";
import EntityTableHeader from "../../components/EntityTableHeader";
import Footer from "../../components/Footer";
import EntityTracks from "../../components/EntityTracks";
import { useCheckAuth } from "../../hooks/auth";
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, DeleteIcon, FolderIcon, LogoIcon, PlaylistIcon, PlusIcon, RemoveFromQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from "../../Svgs";
import EditEntityDialog from "../../components/EditEntityDialog";
import { toast } from "sonner";
import SearchForEntity from "../../components/SearchForEntity";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";
import { useAlbumStore } from "../../store/useAlbumStore";
import { useSavePlaylist } from "../../hooks/savePlaylist";
import { useQueryClient } from "@tanstack/react-query";
import { useShare } from "../../hooks/share";
import PreviewEntityModal from "../../components/PreviewEntityModal";
import AuthRequiredModal from "../../components/AuthRequiredModal";
import { useQueueStore } from "../../store/useQueueStore";
import { useLikeTrack, useTrackLikeStatus } from "../../hooks/like";
import { useGetCurrentUserLibraryItems } from "../../hooks/library";
import { useAddItemToFolder, useUploadFolder } from "../../hooks/folder";

// Constants
const adminId = import.meta.env.VITE_ADMIN_ID;
const controls: Controls = {
    Play: true,
    Preview: true,
    Save: true,
    Share: true,
    Follow: false,
    More: true,
    View: true
};

const PlaylistPage = () => {
    /* ---------- Internal Hooks ---------- */
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    /* ---------- Local States ---------- */
    const [view, setView] = useState<"Compact List" | "Default List">("Default List");
    const [columns, setColumns] = useState<Columns>({
        "Artist": true,
        "Album": true,
        "Duration": true,
        "Date added": false,
    });
    const [currentMenuTrackIndex, setCurrentMenuTrackIndex] = useState(-1);
    const [isEditPlaylistDialogOpen, setIsEditPlaylistDialogOpen] = useState(false);
    const [isPreviewPlaylistModalOpen, setIsPreviewPlaylistModalOpen] = useState(false);
    const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { setAlbumData } = useAlbumStore();
    const { playlistData: { playlistId, activeTrackId, playImmediate }, setPlaylistData } = usePlaylistStore();
    const { queueMap, initializeEntityQueue, addItemsToCustomQueue, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { scrollFromTop } = useScrollStore();

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { data, isLoading } = useGetPlaylistTracks(id || "");
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { data: folders } = useGetCurrentUserLibraryItems("Folders");
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { mutateAsync: uploadPlaylist } = useUploadPlaylist();
    const { mutateAsync: updatePlaylist, isPending } = useUpdatePlaylist();
    const { mutateAsync: addItemsToPlaylist } = useAddItemsToPlaylist();
    const { mutateAsync: savePlaylist } = useSavePlaylist();
    const { mutateAsync: uploadFolder } = useUploadFolder();
    const { mutateAsync: addItemToFolder } = useAddItemToFolder();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();
    const imgUrl = data?.playlist?.coverImageUrl;
    const { dominantColor } = useDominantColor(imgUrl);

    /* ---------- Derived Value ---------- */
    const isOwnPlaylist = currentUser?._id == data?.playlist?.userId;
    const showFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const isPlayingCurrentPlaylist = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying);

    // const secondsArray = data?.tracks?.map((t: Track) => t.duration);
    const playlistUsername = adminId == data?.playlist?.userId ? "Spotify" : data?.playlist?.username;
    const playlistLength = `${data?.playlist?.tracks?.length} tracks`;
    // const playlistDuration = formatTotalAsHMS(secondsArray);
    const description = `${playlistUsername} . ${playlistLength} `

    const currentMenuTrack = (data && data.tracks && currentMenuTrackIndex != -1) ? data.tracks[currentMenuTrackIndex] : undefined;
    const hasLiked = getTrackLikeStatus({ hasLiked: currentMenuTrack?.hasLiked || false, trackId: currentMenuTrack?._id || "" });
    const queueItemid = `Playlist-${id}-${currentMenuTrack?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];

    const playlistMenuOptions: MenuOptions = [
        {
            icon: data?.playlist?.hasSaved ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: data?.playlist?.hasSaved ? "Remove From Your Library" : "Add To Your Library",
            action: () => {
                savePlaylist(data.playlist);
            },
        },
        {
            icon: <AddToQueueIcon width="16" height="16" />,
            label: "Add To Queue",
            action: () => {
                const entityType = "Playlist";
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
            icon: <FolderIcon width="16" height="16" />,
            label: "Add To Folder",
            action: () => { },
            hasTopBorder: true,
            rightSideIcon: <RightArrowIndicatorIcon width="12" height="12" />,
            subMenu: [
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: "Create Folder",
                    action: () => {
                        uploadFolder({ name: `New Folder ${Date.now()}`, playlistIds: [id || ""] });
                    }
                },
                ...(Array.isArray(folders)
                    ? folders.map((folder: Folder) => ({
                        label: folder.name,
                        action: () => {
                            addItemToFolder({
                                folderId: folder._id,
                                playlist: data.playlist
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
                share(`/playlist/${id || ""}`);
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ];

    const trackMenuOptions: MenuOptions = [
        {
            icon: <DeleteIcon width="16" height="16" />,
            label: "Remove This Item From Playlist",
            action: () => {
                const filteredTracks = data.tracks.filter((t: Track) => t._id !== currentMenuTrack._id);

                updatePlaylist({ tracks: filteredTracks });

                const entityType = "Playlist";
                const entityId = id;
                const trackId = currentMenuTrack._id;

                removeItemFromQueue(entityType, entityId || "", trackId);

                if (activeTrackId == trackId) {
                    setPlaylistData({ playlistId: "", activeTrackId: "" });
                }
            },
            hideOption: currentUser?._id != data?.playlist?.userId
        },
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
                            addItemsToPlaylist({
                                playlistId: playlist._id,
                                tracks: [currentMenuTrack]
                            })
                        }
                    }))
                    : [])
            ]
        },
        {
            icon: hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: hasLiked ? "Remove From Your Liked Track" : "Add To Your Liked Track",
            action: () => {
                if (currentMenuTrack) likeTrack(currentMenuTrack);
            },
        },
        {
            icon: hasTrackInQueue ? <RemoveFromQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: () => {
                if (!currentMenuTrack) return;

                const entityType = "Playlist";
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
            action: () => { },
        },
        {
            icon: <AlbumIcon width="16" height="16" />,
            label: "Go To Album",
            action: () => {
                navigate(`/album/${currentMenuTrack?.albumId}`);
            }
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

        const isPlaylistInitialized = playlistId == id;

        if (!isPlaylistInitialized) {
            setPlaylistData({ activeTrackId: track._id, playlistId: id || "" });

            setAlbumData({ activeTrackId: "", albumId: "" });

            setTrackDetails({
                ...track,
                isPlaying: true
            });

            let playlistIds: string[] = JSON.parse(localStorage.getItem("recentPlaylists") || "[]");
            if (playlistIds[0] != id) {
                playlistIds = playlistIds.filter((i) => i != id);
                playlistIds = [id || "", ...playlistIds];
                localStorage.setItem("recentPlaylists", JSON.stringify(playlistIds));

                queryClient.setQueryData(["getRecentPlaylists"], (prev: Playlist[]) => {
                    if (!prev) return prev;

                    const filteredPlaylists = prev.filter((p) => p?._id != id);
                    const currentPlaylist = {
                        _id: data.playlist._id,
                        title: data.playlist.title,
                        coverImageUrl: data.playlist.coverImageUrl,
                        userId: data.playlist.userId,
                        genre: [],
                        tracks: [],
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }

                    return [
                        currentPlaylist,
                        ...filteredPlaylists
                    ]
                })
            }

            initializeEntityQueue(data.tracks, "Playlist", id || "", data.playlist.title);
            setActiveEntityQueueListNode("Playlist", id || "", track._id);
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

                setPlaylistData({ activeTrackId: track._id });
                setActiveEntityQueueListNode("Playlist", id || "", track._id);
            }
        }
    }

    const handleUpdatePlaylist = (payload: { title: string, coverImageUrl: string }) => {
        const { title, coverImageUrl } = payload;
        if (title == data.playlist.title && !coverImageUrl) return toast.error("No Changes Detected!");

        updatePlaylist(payload);
    }

    const onEditPlaylist = () => {
        if (!isOwnPlaylist) return;
        setIsEditPlaylistDialogOpen(true);
    }

    const handlers: Handlers = {
        Play: () => {
            if (data && data.tracks) handlePlayPauseTrack(data.tracks[0], isPlayingCurrentPlaylist, "PlayButton");
        },
        Preview: () => {
            if (!currentUser) {
                setIsAuthRequiredModalOpen(true);
                return;
            }

            setIsPreviewPlaylistModalOpen(true);
            setTrackDetails({ isPlaying: false });
        },
        Save: () => {
            savePlaylist(data.playlist);
        },
        Share: () => {
            share(`/playlist/${id}`);
        },
        Follow: () => { },
        More: () => { },
        View: () => { },
    }

    /* ---------- UseEffects ---------- */
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

    useEffect(() => {
        if (isLoading || !data || !data?.tracks || data?.tracks?.length == 0) return;

        if (playImmediate) {
            handlers["Play"]();
        }
    }, [playImmediate, isLoading, id])

    if (isLoading) return null;

    if (!isLoading && !data) return <NotFoundEntity title="Couldn't Find That Playlist" />;

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
            <EntityHeader
                title={data.playlist.title}
                dominateColor={dominantColor || "#3C3C3C"}
                isPlayingCurrentEntity={isPlayingCurrentPlaylist}
                handlePlayEntity={handlers["Play"]}
            />

            {/* Playlist Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Public Playlist",
                        title: data.playlist.title,
                        description,
                        placeholderIcon: <PlaylistIcon width="63" height="63" />,
                        isOwnEntity: isOwnPlaylist
                    }
                }
                dominateColor={dominantColor || "#3C3C3C"}
                onEditEntity={onEditPlaylist}
            />

            {
                data.tracks.length > 0 ? (
                    <>
                        {/* Playlist Controls */}
                        <EntityControls
                            controls={controls}
                            handlers={handlers}
                            view={view}
                            setView={setView}
                            entity={{
                                title: data.playlist.title,
                                imgUrl,
                                hasSaved: data.playlist.hasSaved,
                                isPlaying: isPlayingCurrentPlaylist
                            }}
                            entityMenuOptions={playlistMenuOptions}
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
                            <EntityTracks
                                tracks={data.tracks}
                                columns={columns}
                                view={view}
                                isPlayingCurrentEntity={isPlayingCurrentPlaylist}
                                currentMenuTrackIndex={currentMenuTrackIndex}
                                setCurrentMenuTrackIndex={setCurrentMenuTrackIndex}
                                trackMenuOptions={trackMenuOptions}
                                handlePlayPauseTrack={handlePlayPauseTrack}
                            />
                        </div>
                    </>
                ) : (
                    isOwnPlaylist ?
                        <SearchForEntity title="Let's find something for your playlist" />
                        :
                        <NotFoundTracks title="No Tracks Added For This Playlist" />
                )
            }

            <Footer />

            {
                isPreviewPlaylistModalOpen && <PreviewEntityModal tracks={data.tracks} onClose={() => setIsPreviewPlaylistModalOpen(false)} />
            }

            {
                isAuthRequiredModalOpen && <AuthRequiredModal onClose={() => setIsAuthRequiredModalOpen(false)} imgUrl={imgUrl} />
            }

            {
                isEditPlaylistDialogOpen &&
                <EditEntityDialog
                    isOpen={isEditPlaylistDialogOpen}
                    onClose={() => setIsEditPlaylistDialogOpen(false)}
                    entity={{
                        defaultTitle: data?.playlist?.title || "",
                        defaultImgUrl: imgUrl,
                        placeholderIcon: <PlaylistIcon width="63" height="63" />
                    }}
                    isPending={isPending}
                    handleUpdateEntity={handleUpdatePlaylist}
                />
            }
        </div>
    );
};

export default PlaylistPage;
