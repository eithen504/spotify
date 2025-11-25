import { useEffect, useState } from "react";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { getScrollThreshold } from "../../utils";
import { useDominantColor } from "../../hooks/color";
import type { Controls, Handlers, MenuOptions, Playlist, Track, TrackMenuState } from "../../types";
import { NotFoundTracks } from "../../components/NotFounds";
import EntityHeader from "../../components/EntityHeader";
import EntityInfoSection from "../../components/EntityInfoSection";
import EntityControls from "../../components/EntityControls";
import EntityTableHeader from "../../components/EntityTableHeader";
import Footer from "../../components/Footer";
import EntityTracks from "../../components/EntityTracks";
import { useCheckAuth } from "../../hooks/auth";
import { useGetLikedTracks, useLikeTrack, useTrackLikeStatus } from "../../hooks/like";
import { useAlbumStore } from "../../store/useAlbumStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueueStore } from "../../store/useQueueStore";
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, AlreadyAddedToQueueIcon, ReportIcon, SavedIcon, ShareIcon, PlusIcon, RightArrowIndicatorIcon } from "../../Svgs";
import { useShare } from "../../hooks/share";
import { CollectionTracksPageSkeleton } from "../../components/Skeletons";
import { useAddItemsToPlaylist, useUploadPlaylist } from "../../hooks/playlist";
import { useGetCurrentUserLibraryItems } from "../../hooks/library";
import { useTableColumnVisibilityStore } from "../../store/useTableColumnVisibilityStore";
import { RECENT_PLAYLISTS_KEY } from "../../constants";

const id = "collectionTracks";
const imgUrl = "https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
const controls: Controls = {
    Play: true,
    Preview: false,
    Save: false,
    Share: false,
    Follow: false,
    More: false,
    View: true
};

const CollectionTracksPage = () => {
    /*----------Internal Hooks----------*/
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    /* ----------Local States---------- */
    const [trackMenu, setTrackMenu] = useState<TrackMenuState>({
        isOpen: false,
        track: null
    });
    const [collectionTableColumnOptions, setCollectionTableColumnOptions] = useState<MenuOptions>([])

    /*----------Stores----------*/
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { setAlbumData } = useAlbumStore();
    const { playlistData: { playlistId, activeTrackId, playImmediate }, setPlaylistData } = usePlaylistStore();
    const { queueMap, initializeEntityQueue, addItemsToCustomQueue, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { tableView, playlistTableColumns, togglePlaylistTableColumn } = useTableColumnVisibilityStore();
    const { scrollFromTop } = useScrollStore();

    /*----------Custom Hooks----------*/
    const { data: currentUser } = useCheckAuth();
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { data: tracks, isLoading } = useGetLikedTracks();
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { dominantColor } = useDominantColor(imgUrl);
    const { mutateAsync: uploadPlaylist } = useUploadPlaylist();
    const { mutateAsync: addItemsToPlaylist } = useAddItemsToPlaylist();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();

    /*----------Derived Value----------*/
    const showFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying)

    const description = `${currentUser?.displayName} . ${tracks?.length} Tracks`;

    const { track: currentMenuTrack } = trackMenu;
    const hasLiked = getTrackLikeStatus({ hasLiked: currentMenuTrack?.hasLiked || false, trackId: currentMenuTrack?._id || "" });
    const queueItemid = `Playlist-${id}-${currentMenuTrack?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];

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
                                tracks: [currentMenuTrack]
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

    /*----------Methods Or Functions----------*/
    const handlePlayPauseTrack = (track: Track, isPlayingCurrentTrack: boolean, source?: "PlayButton" | "EntityTracks") => {
        const isPlaylistInitialized = playlistId == id;

        if (!isPlaylistInitialized) {
            setPlaylistData({
                activeTrackId: track._id,
                playlistId: id || ""
            });

            setAlbumData({
                activeTrackId: "",
                albumId: ""
            });

            setTrackDetails({
                ...track,
                isPlaying: true
            });

            let playlistIds: string[] = JSON.parse(localStorage.getItem("recentPlaylists") || "[]")
            if (playlistIds[0] != id) {
                playlistIds = playlistIds.filter((i) => i != id)
                playlistIds = [id || "", ...playlistIds]
                localStorage.setItem(RECENT_PLAYLISTS_KEY, JSON.stringify(playlistIds))

                queryClient.setQueryData(["getRecentPlaylists"], (prev: Playlist[]) => {
                    if (!prev) return prev;

                    const filteredPlaylists = prev.filter((p) => p?._id != id);
                    const currentPlaylist = {
                        _id: id,
                        title: "Liked Tracks",
                        coverImageUrl: "https://misc.scdn.co/liked-songs/liked-songs-300.jpg",
                        userId: currentUser?._id,
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

            initializeEntityQueue(tracks, "Playlist", id, "Liked Tracks");
            setActiveEntityQueueListNode("Playlist", id, track._id);
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

    const handlers: Handlers = {
        Play: () => {
            if (tracks) handlePlayPauseTrack(tracks[0], isPlayingCollectionTracks, "PlayButton");
        },
        Preview: () => { },
        Save: () => { },
        Share: () => { },
        Follow: () => { },
        More: () => { },
        View: () => { },
    }

    /*----------UseEffects----------*/
    useEffect(() => {
        if (tableView == "Compact List") {
            setCollectionTableColumnOptions([
                {
                    label: "Artist",
                    action: () => {
                        togglePlaylistTableColumn("ARTIST");
                    }
                },
                {
                    label: "Album",
                    action: () => {
                        togglePlaylistTableColumn("ALBUM");
                    }
                },
                {
                    label: "Duration",
                    action: () => {
                        togglePlaylistTableColumn("DURATION");
                    }
                }
            ])
        } else {
            setCollectionTableColumnOptions([
                {
                    label: "Album",
                    action: () => {
                        togglePlaylistTableColumn("ALBUM");
                    }
                },
                {
                    label: "Date Added",
                    action: () => {
                        togglePlaylistTableColumn("DATE ADDED");
                    }
                },
                {
                    label: "Duration",
                    action: () => {
                        togglePlaylistTableColumn("DURATION");
                    }
                }
            ])
        }
    }, [tableView])

    useEffect(() => {
        if (isLoading) return;

        if (playImmediate) {
            handlers["Play"]()
        }
    }, [playImmediate, isLoading])

    if (isLoading) return <CollectionTracksPageSkeleton />;

    if (!currentUser) {
        navigate('/');
        return;
    }

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

            {/* Collection Tracks Header */}
            <EntityHeader
                title={"Liked Tracks"}
                dominateColor={dominantColor || "#3C3C3C"}
                isPlayingCurrentEntity={isPlayingCollectionTracks}
                handlePlayEntity={handlers["Play"]}
            />

            {/* Collection Tracks Info Section */}
            <EntityInfoSection
                entity={
                    {
                        imgUrl,
                        displayType: "Private Playlist",
                        title: "Liked Tracks",
                        description,
                    }
                }
                dominateColor={dominantColor || "#3C3C3C"}
            />

            {
                tracks.length > 0 ? (
                    <>
                        {/* Collection Tracks Controls */}
                        <EntityControls
                            controls={controls}
                            handlers={handlers}
                            entity={{
                                isPlaying: isPlayingCollectionTracks
                            }}

                        />

                        <div className="relative max-w-[90rem] mx-auto">
                            {/* Collection Tracks Table Header */}
                            <EntityTableHeader
                               tableColumns={playlistTableColumns}
                               options={collectionTableColumnOptions}
                            />

                            {/* Seperator Line */}
                            <div className={`${showFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                                <div className="w-full h-[1px] bg-white/10 " />
                            </div>

                            {/* Collection Tracks Tracks */}
                            <EntityTracks
                                tracks={tracks}
                                tableColumns={playlistTableColumns}
                                isPlayingCurrentEntity={isPlayingCollectionTracks}
                                trackMenuOptions={trackMenuOptions}
                                trackMenu={trackMenu}
                                setTrackMenu={setTrackMenu}
                                handlePlayPauseTrack={handlePlayPauseTrack}
                            />
                        </div>
                    </>
                ) : (
                    <NotFoundTracks title="No Tracks Added For This Collection" />
                )
            }

            <Footer />
        </div>
    );
};

export default CollectionTracksPage;
