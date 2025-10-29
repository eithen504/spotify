import React, { useRef, useState } from 'react'
import { LeftArrowIcon, PauseIcon, PlayIcon, RightArrowIcon } from '../../../Svgs';
import type { Playlist } from '../../../types';
import { PlaylistSectionItemPlaceholder } from '../../../components/Placeholders';
import { useTrackDetailsStore } from '../../../store/useTrackDetailsStore';
import { usePlaylistStore } from '../../../store/usePlaylistStore';
import { usePlaylistActions } from '../../../hooks/playlist';
import { useCheckAuth } from '../../../hooks/auth';
import AuthRequiredModal from '../../../components/AuthRequiredModal';


interface PlaylistSectionItemsProps {
    playlists: Playlist[]
}

const PlaylistSectionItems: React.FC<PlaylistSectionItemsProps> = ({ playlists }) => {
    const scrollRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: true });
    const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
    const [playlistImgUrl, setPlaylistImgUrl] = useState("")

    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { playlistId, activeTrackId } } = usePlaylistStore();
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const { data: currentUser } = useCheckAuth();

    const handlePlayPauseButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        isPlayingCurrentPlaylist: boolean,
        id: string,
        navigateUrl: string,
        imgUrl: string,
    ) => {
        e.stopPropagation()
        if (!currentUser) {
            setIsAuthRequiredModalOpen(true);
            setPlaylistImgUrl(imgUrl)
            return;
        }
        handlePlayPausePlaylist(
            isPlayingCurrentPlaylist,
            id,
            navigateUrl,
        )
    }

    const checkScrollability = (): void => {
        if (scrollRef.current) {
            const container = scrollRef.current as HTMLDivElement;
            const hasHorizontalScroll: boolean = container.scrollWidth > container.clientWidth;
            const atStart: boolean = container.scrollLeft <= 0;
            const atEnd: boolean = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

            setCanScroll({
                left: hasHorizontalScroll && !atStart,
                right: hasHorizontalScroll && !atEnd,
            });
        }
    };

    const scroll = (direction: 'left' | 'right'): void => {
        if (scrollRef.current) {
            const container = scrollRef.current as HTMLDivElement;
            const scrollAmount = direction === 'left' ? -250 : 250;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };

    return (
        <div className="relative [&:hover_.left-arrow]:opacity-100">
            {/* Fixed left arrow that appears on hover */}
            {
                canScroll.left && (
                    <div className={`left-4 md:left-10 left-arrow absolute top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 z-10`}>
                        <button
                            className="cursor-pointer p-[7px] text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover rounded-full flex items-center justify-center shadow-lg"
                            style={{
                                '--bgHoverColor': '#282828',
                            } as React.CSSProperties}
                            onClick={() => scroll("left")}
                        >
                            <LeftArrowIcon width="18" height="18" />
                        </button>
                    </div>
                )
            }

            {/* Fixed right arrow that appears on hover */}
            {
                canScroll.right && (
                    <div className="left-arrow absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 z-10">
                        <button
                            className="cursor-pointer p-[7px] text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover rounded-full flex items-center justify-center shadow-lg"
                            style={{
                                '--bgHoverColor': '#282828',
                            } as React.CSSProperties}
                            onClick={() => scroll("right")}
                        >
                            <RightArrowIcon width="18" height="18" />
                        </button>
                    </div>
                )
            }

            <div
                className={`flex overflow-x-auto hide-scrollbar [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 md:px-7`}
                ref={scrollRef}
                onScroll={checkScrollability}
            >
                {playlists.map((playlist, index) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)

                    return (
                        <div
                            key={index}
                            className="dynamic-bg-hover group cursor-pointer rounded-sm p-3 flex-none w-44 transition-transform duration-300"
                            style={{
                                '--bgHoverColor': '#1C1C1C',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            <div className="relative overflow-hidden rounded-[4px] transition-shadow duration-300">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={`Album cover for ${playlist.title}`}
                                            className="w-full aspect-square rounded-[4px] transition-opacity duration-300 object-cover"
                                        />
                                    ) : (
                                        <PlaylistSectionItemPlaceholder />
                                    )
                                }

                                <div className="absolute inset-0">
                                    <button
                                        className="p-4 text-black cursor-pointer rounded-full flex items-center justify-center group-hover-opacity transition-all duration-300 bg-[#1ed760] hover:bg-[#3BE477] backdrop-blur-sm absolute bottom-2 right-2"
                                        aria-label={`Play ${playlist.title}`}
                                        onClick={(e) => handlePlayPauseButtonClick(
                                            e,
                                            isPlayingCurrentPlaylist,
                                            playlist._id,
                                            `/playlist/${playlist._id}`,
                                            playlist.coverImageUrl
                                        )}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="font-medium text-md mt-2 truncate overflow-ellipsis">{playlist.title}</div>
                            <div className="text-sm text-gray-400 truncate overflow-ellipsis mt-0.5">
                                {`Playlist . Tracks . ${playlist.tracks.length}`}
                            </div>
                        </div>
                    );
                })}
            </div>

            {
                isAuthRequiredModalOpen && <AuthRequiredModal onClose={() => setIsAuthRequiredModalOpen(false)} imgUrl={playlistImgUrl} />
            }
        </div>
    )
}

export default PlaylistSectionItems