import type React from "react"
import { AddIcon, AddToQueueIcon, CreditIcon, DownArrowIcon, LogoIcon, MoreIcon, PlusIcon, AlreadyAddedToQueueIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon, AlbumIcon } from "../../../../Svgs";
import type { MenuOptions } from "../../../../types";
import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useShare } from "../../../../hooks/share";
import { useState } from "react";
import { useQueueStore } from "../../../../store/useQueueStore";
import { useAlbumStore } from "../../../../store/useAlbumStore";
import { usePlaylistStore } from "../../../../store/usePlaylistStore";
import EntityOptionsDrawer from "../../../../components/EntityOptionsDrawer";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();

    /* ---------- Local States ---------- */
    const [isTrackDrawerOpen, setIsTrackDrawerOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();
    const { queueMap, addItemsToCustomQueue, removeItemFromQueue } = useQueueStore();
    const { albumData: { albumId } } = useAlbumStore();
    const { playlistData: { playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked || false, trackId: trackDetails._id || "" })
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();

    /* ---------- Derived Values ---------- */
    const queueItemid = albumId ? `Album-${albumId}-${trackDetails?._id}` : `Playlist-${playlistId}-${trackDetails?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];
    const trackDrawerOptions: MenuOptions = [
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
                likeTrack(trackDetails);
            },
        },
        {
            icon: hasTrackInQueue ? <AlreadyAddedToQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: () => {
                const entityType = albumId ? "Album" : "Playlist";
                const entityId = albumId || playlistId;
                const trackId = trackDetails._id;

                if (hasTrackInQueue) {
                    removeItemFromQueue(entityType, entityId || "", trackId);
                } else {
                    addItemsToCustomQueue([trackDetails], entityType, entityId || "");
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
                navigate(`/album/${trackDetails?.albumId}`);
            }
        },
        {
            icon: <ShareIcon width="16" height="16" />,
            label: "Share",
            action: () => {
                share(`/track/${trackDetails?._id || ""}`);
            },
        },
        {
            icon: <LogoIcon width="16" height="16" />,
            label: "Open In Desktop App",
            action: () => { },
            hasTopBorder: true,
        },
    ]

    return (
        <div className="flex items-center justify-between px-4 py-3 text-[#ffffff] flex-shrink-0">
            <button className="cursor-pointer"
                onClick={onClose}
            >
                <DownArrowIcon width="24" height="24" />
            </button>

            <h1 className="text-xs font-medium">Now Playing</h1>

            <div className="relative flex items-center">
                <button className="cursor-pointer rotate-90 active:text-white/60"
                    onClick={() => setIsTrackDrawerOpen(true)}
                >
                    <MoreIcon width="24" height="24" />
                </button>

                {isTrackDrawerOpen && (
                    <EntityOptionsDrawer
                        onClose={() => setIsTrackDrawerOpen(false)}
                        options={trackDrawerOptions}
                        entity={{
                            title: trackDetails.title,
                            imgUrl: trackDetails.coverImageUrl
                        }}
                        height="477px"
                    />
                )}
            </div>

        </div>
    )
}

export default Header