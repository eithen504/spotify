import { useEffect, useState } from "react";
import { useScrollStore } from "../../store/useScrollStore";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { getScrollThreshold } from "../../utils";
import { useDominantColor } from "../../hooks/color";
import type { Columns, Controls, Handlers, MenuOptions, Playlist, Track } from "../../types";
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
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, RemoveFromQueueIcon, ReportIcon, SavedIcon, ShareIcon } from "../../Svgs";
import { useShare } from "../../hooks/share";

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
    const [view, setView] = useState<"Compact List" | "Default List">("Default List");
    const [columns, setColumns] = useState<Columns>({
        "Artist": true,
        "Album": true,
        "Duration": true,
        "Date added": false,
    });
    const [currentMenuTrackIndex, setCurrentMenuTrackIndex] = useState(-1);

    /*----------Stores----------*/
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { setAlbumData } = useAlbumStore();
    const { playlistData: { playlistId, activeTrackId, playImmediate }, setPlaylistData } = usePlaylistStore();
    const { queueMap, initializeEntityQueue, addItemsToCustomQueue, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { scrollFromTop } = useScrollStore();

    /*----------Custom Hooks----------*/
    const { data: currentUser } = useCheckAuth();
    const { data: tracks, isLoading } = useGetLikedTracks();
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();
    const { dominantColor } = useDominantColor(imgUrl);

    /*----------Derived Value----------*/
    const showFullBorder = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying)

    const description = `${currentUser?.displayName} . ${tracks?.length} Tracks`;

    const currentMenuTrack = (tracks && currentMenuTrackIndex != -1) ? tracks[currentMenuTrackIndex] : undefined;
    const hasLiked = getTrackLikeStatus({ hasLiked: currentMenuTrack?.hasLiked || false, trackId: currentMenuTrack?._id || "" });
    const queueItemid = `Playlist-${id}-${currentMenuTrack?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];

    const trackMenuOptions: MenuOptions = [
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
        },
        {
            icon: <AlbumIcon width="16" height="16" />,
            label: "Go To Album",
            action: () => {
                navigate(`/album/${currentMenuTrack?.albumId}`)
            },
            hasTopBorder: true
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
                share(`/track/${currentMenuTrack?._id || ""}`)
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
                localStorage.setItem("recentPlaylists", JSON.stringify(playlistIds))

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
        if (isLoading) return;

        if (playImmediate) {
            handlers["Play"]()
        }
    }, [playImmediate, isLoading])

    if (isLoading) return null;

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
                            view={view}
                            setView={setView}
                            entity={{
                                isPlaying: isPlayingCollectionTracks
                            }}

                        />

                        <div className="relative max-w-[90rem] mx-auto">
                            {/* Collection Tracks Table Header */}
                            <EntityTableHeader
                                view={view}
                                columns={columns}
                                setColumns={setColumns}
                            />

                            {/* Seperator Line */}
                            <div className={`${showFullBorder ? "px-0" : "px-6"} hidden md:block sticky top-25 left-0 w-full mb-3`}>
                                <div className="w-full h-[1px] bg-white/10 " />
                            </div>

                            {/* Collection Tracks Tracks */}
                            <EntityTracks
                                tracks={tracks}
                                columns={columns}
                                view={view}
                                isPlayingCurrentEntity={isPlayingCollectionTracks}
                                currentMenuTrackIndex={currentMenuTrackIndex}
                                setCurrentMenuTrackIndex={setCurrentMenuTrackIndex}
                                trackMenuOptions={trackMenuOptions}
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
