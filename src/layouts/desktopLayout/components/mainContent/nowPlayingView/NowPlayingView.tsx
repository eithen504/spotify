import React, { useEffect, useRef, useState } from "react"
import CreditSection from "./CreditSection"
import Header from "./Header"
import QueueSection from "./QueueSection"
import TrackInfo from "./TrackInfo"
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore"
import { useQueueStore } from "../../../../../store/useQueueStore"
import type { MenuOptions, Playlist } from "../../../../../types"
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, PlusIcon, RemoveFromQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from "../../../../../Svgs"
import { useLikeTrack, useTrackLikeStatus } from "../../../../../hooks/like"
import { useAlbumStore } from "../../../../../store/useAlbumStore"
import { usePlaylistStore } from "../../../../../store/usePlaylistStore"
import { useNavigate } from "react-router-dom"
import { useShare } from "../../../../../hooks/share"
import { useGetCurrentUserLibraryItems } from "../../../../../hooks/library"
import { useAddItemsToPlaylist, useUploadPlaylist } from "../../../../../hooks/playlist"

interface NowPlayingViewProps {
    rightPanelSize: number;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ rightPanelSize }) => {
    const navigate = useNavigate();
    const { trackDetails } = useTrackDetailsStore()
    const [isScrolled, setIsScrolled] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null)
    const { addItemToCustomQueue, removeItemFromQueue, queueMap, customQueue, activeEntityQueueListNode } = useQueueStore();
    const { albumData: { albumId } } = useAlbumStore();
    const { playlistData: { playlistId } } = usePlaylistStore();
    const nextQueueItem = customQueue.head.next?.value || activeEntityQueueListNode?.next?.value;
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails?.hasLiked || false, trackId: trackDetails?._id || "" });
    const { mutateAsync: likeTrack } = useLikeTrack();
    const queueItemid = albumId ? `Album-${albumId}-${trackDetails?._id}` : `Playlist-${playlistId}-${trackDetails?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];
    const { share } = useShare();
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { mutateAsync: uploadPlaylist } = useUploadPlaylist();
    const { mutateAsync: addItemsToPlaylist } = useAddItemsToPlaylist();

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
                        uploadPlaylist({ title: `New Playlist ${Date.now()}`, coverImageUrl: "", genre: [], tracks: [trackDetails._id] });
                    }
                },
                ...(Array.isArray(playlists)
                    ? playlists.map((playlist: Playlist) => ({
                        label: playlist.title,
                        action: () => {
                            // addItemToFolder({
                            //     folderId: folder._id,
                            //     playlist: data.playlist
                            // })
                            addItemsToPlaylist({
                                playlistId: playlist._id,
                                tracks: [{
                                    _id: trackDetails._id,
                                    title: trackDetails.title,
                                    coverImageUrl: trackDetails.coverImageUrl,
                                    audioUrl: trackDetails.audioUrl,
                                    artist: trackDetails.artist,
                                    duration: trackDetails.duration,
                                    genre: [],
                                    albumId: trackDetails.albumId,
                                    albumName: trackDetails.albumName,
                                    hasLiked: trackDetails.hasLiked,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }]
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
                likeTrack({
                    _id: trackDetails._id,
                    title: trackDetails.title,
                    coverImageUrl: trackDetails.coverImageUrl,
                    audioUrl: trackDetails.audioUrl,
                    artist: trackDetails.artist,
                    duration: trackDetails.duration,
                    genre: [],
                    albumId: trackDetails.albumId,
                    albumName: trackDetails.albumName,
                    hasLiked: trackDetails.hasLiked,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            },
        },
        {
            icon: hasTrackInQueue ? <RemoveFromQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: () => {
                if (hasTrackInQueue) {
                    if (albumId) {
                        removeItemFromQueue("Album", albumId, trackDetails._id);
                    } else {
                        removeItemFromQueue("Playlist", playlistId, trackDetails._id);
                    }
                } else {
                    if (albumId) {
                        addItemToCustomQueue(
                            {
                                _id: trackDetails._id,
                                title: trackDetails.title,
                                coverImageUrl: trackDetails.coverImageUrl,
                                audioUrl: trackDetails.audioUrl,
                                artist: trackDetails.artist,
                                duration: trackDetails.duration,
                                genre: [],
                                albumId: trackDetails.albumId,
                                albumName: trackDetails.albumName,
                                hasLiked: trackDetails.hasLiked,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            },
                            "Album",
                            albumId
                        );
                    } else {
                        addItemToCustomQueue(
                            {
                                _id: trackDetails._id,
                                title: trackDetails.title,
                                coverImageUrl: trackDetails.coverImageUrl,
                                audioUrl: trackDetails.audioUrl,
                                artist: trackDetails.artist,
                                duration: trackDetails.duration,
                                genre: [],
                                albumId: trackDetails.albumId,
                                albumName: trackDetails.albumName,
                                hasLiked: trackDetails.hasLiked,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            },
                            "Playlist",
                            playlistId
                        );
                    }
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
            icon: <CreditIcon width="16" height="16" />,
            label: "View Credits",
            action: () => { },
        },
        {
            icon: <AlbumIcon width="16" height="16" />,
            label: "Go To Album",
            action: () => {
                navigate(`/album/${trackDetails?.albumId}`);
            },
        },
        {
            icon: <ShareIcon width="16" height="16" />,
            label: "Share",
            action: () => {
                share(`/track/${trackDetails._id || ""}`)
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ]

    useEffect(() => {
        const sidebarEl = sidebarRef.current
        if (!sidebarEl) return

        const handleScroll = () => {
            if (sidebarEl.scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        sidebarEl.addEventListener('scroll', handleScroll)

        return () => {
            sidebarEl.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <aside
            className={`hidden lg:flex bg-[#121212] text-[#ffffff] relative h-full flex-col overflow-y-auto hide-scrollbar ${trackDetails._id ? "group opacity-100" : "opacity-50"}`}
            style={{ width: `${rightPanelSize}%` }}
            ref={sidebarRef}
        >
            {/* Header */}
            <Header isScrolled={isScrolled} trackMenuOptions={trackMenuOptions} />

            {/* Scrollable Content */}
            <div className="flex-1 px-4 pb-4">
                {/* Track Info */}
                <TrackInfo />

                {/* Credit Section */}
                <CreditSection />

                {/* Queue Section */}
                {
                    nextQueueItem && <QueueSection />
                }
            </div>
        </aside>
    )
}

export default NowPlayingView