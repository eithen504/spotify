import type React from "react"
import { AddIcon, AddToQueueIcon, AlbumIcon, CreditIcon, DownArrowIcon, LogoIcon, MoreIcon, ReportIcon, SavedIcon, ShareIcon } from "../../../../Svgs";
import type { MenuOptions } from "../../../../types";
import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useShare } from "../../../../hooks/share";
import { useState } from "react";
import EntityOptionsDrawer from "../../../../components/EntityOptionsDrawer";

interface HeaderProps {
    onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { trackDetails } = useTrackDetailsStore();
    const { mutateAsync: likeTrack } = useLikeTrack();

    const [isTrackDrawerOpen, setIsTrackDrawerOpen] = useState(false);

    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked || false, trackId: trackDetails._id || "" })
    const { share } = useShare();

    const handleLikeUnlikeTrack = () => {
        likeTrack(trackDetails)
    }

    const trackDrawerOptions: MenuOptions = [
        {
            icon: hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />,
            label: hasLiked ? "Remove From Your Liked Track" : "Add To Your Liked Track",
            action: () => {
                handleLikeUnlikeTrack()
            },
        },
        {
            icon: <AddToQueueIcon width="16" height="16" />,
            label: "Add To Queue",
            action: () => { },
        },
        {
            icon: <ReportIcon width="16" height="16" />,
            label: "Report",
            action: () => { },
        },
        {
            icon: <AlbumIcon width="16" height="16" />,
            label: "Go To Album",
            action: () => { },
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
                        height="110"
                    />
                )}
            </div>

        </div>
    )
}

export default Header