import React, { useEffect, useRef, useState } from "react"
import CreditsSection from "./CreditsSection"
import Header from "./Header"
import QueueSection from "./QueueSection"
import TrackInfo from "./TrackInfo"
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore"
import { useQueueStore } from "../../../../../store/useQueueStore"
import type { MenuOptions, Playlist } from "../../../../../types"
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, LogoIcon, PlusIcon, AlreadyAddedToQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from "../../../../../Svgs"
import { useLikeTrack, useTrackLikeStatus } from "../../../../../hooks/like"
import { useAlbumStore } from "../../../../../store/useAlbumStore"
import { usePlaylistStore } from "../../../../../store/usePlaylistStore"
import { useNavigate } from "react-router-dom"
import { useShare } from "../../../../../hooks/share"
import { useGetCurrentUserLibraryItems } from "../../../../../hooks/library"
import { useAddItemsToPlaylist, useUploadPlaylist } from "../../../../../hooks/playlist"
import EmptyQueueSection from "./EmptyQueueSection"
import TrackCreditsDialog from "../../../../../components/TrackCreditsDialog"

interface NowPlayingViewProps {
    rightPanelSize: number;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ rightPanelSize }) => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();

    /* ---------- Local States ---------- */
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTrackCreditsDialogOpen, setIsTrackCreditsDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const sidebarRef = useRef<HTMLDivElement | null>(null)

    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();
    const { albumData: { albumId } } = useAlbumStore();
    const { playlistData: { playlistId } } = usePlaylistStore();
    const { customQueue, queueMap, activeEntityQueueListNode, addItemsToCustomQueue, removeItemFromQueue } = useQueueStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails?.hasLiked || false, trackId: trackDetails?._id || "" });
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { mutateAsync: uploadPlaylist } = useUploadPlaylist();
    const { mutateAsync: addItemsToPlaylist } = useAddItemsToPlaylist();
    const { share } = useShare();

    /* ---------- Derived Values ---------- */
    const hasNextItemInQueue = customQueue.head.next?.value || activeEntityQueueListNode?.next?.value;
    const queueItemId = albumId ? `Album-${albumId}-${trackDetails?._id}` : `Playlist-${playlistId}-${trackDetails?._id}`;
    const hasTrackInQueue = queueMap[queueItemId];
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
                        uploadPlaylist({ title: `New Playlist ${Date.now()}`, coverImageUrl: "", genres: [], tracks: [trackDetails._id], visibility: "Public" });
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
                                tracks: [trackDetails]
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
                likeTrack(trackDetails)
            },
        },
        {
            icon: hasTrackInQueue ? <AlreadyAddedToQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
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
                        addItemsToCustomQueue(
                            [trackDetails],
                            "Album",
                            albumId
                        );
                    } else {
                        addItemsToCustomQueue(
                            [trackDetails],
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
            action: () => {
                setIsTrackCreditsDialogOpen(true);
            },
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

    /* ---------- UseEffects ---------- */
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
                <CreditsSection />

                {/* Queue Section */}
                {
                    hasNextItemInQueue ? <QueueSection /> : <EmptyQueueSection />
                }
            </div>

            {
                isTrackCreditsDialogOpen && (
                    <TrackCreditsDialog
                        track={trackDetails}
                        onClose={() => setIsTrackCreditsDialogOpen(false)}
                    />
                )
            }
        </aside>
    )
}

export default NowPlayingView