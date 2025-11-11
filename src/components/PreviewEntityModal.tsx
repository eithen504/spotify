import React, { useEffect, useRef, useState } from 'react'
import { AddIcon, AddToQueueIcon, AlbumIcon, AlreadyAddedToQueueIcon, BackArrowIcon, CreditIcon, CrossIcon, DownArrowIcon, HighVolumeIcon, LogoIcon, MoreIcon, MuteVolumeIcon, PlusIcon, ReportIcon, RightArrowIndicatorIcon, SavedIcon, ShareIcon } from '../Svgs'
import { Slider } from './ui/slider'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel'
import type { MenuOptions, Track, TrackDetails } from '../types'
import { useDominantColor } from '../hooks/color'
import { PreviewEntityDialogMusicPlaceHolder } from './Placeholders'
import { useQueueStore } from '../store/useQueueStore'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import EntityOptionsMenu from './EntityOptionsMenu'
import { useLikeTrack, useTrackLikeStatus } from '../hooks/like'
import { useShare } from '../hooks/share'
import { useBreakPoint } from '../hooks/breakPoint'
import EntityOptionsDrawer from './EntityOptionsDrawer'

type PreviewEntityModalProps = {
    tracks: Track[]
    onClose: () => void
}

const PreviewEntityModal: React.FC<PreviewEntityModalProps> = ({ tracks, onClose }) => {
    /*----------Internal Hooks----------*/
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id } = useParams();

    /* ---------- Local States ---------- */
    const [trackDetails, setTrackDetails] = useState<TrackDetails>({
        _id: "",
        title: "",
        coverImageUrl: "",
        audioUrl: "",
        artist: "",
        duration: 0,
        genres: [],
        albumId: "",
        albumName: "",
        language: "English",
        hasLiked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPlaying: false
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState([0]);
    const [volumeEnabled, setVolumeEnabled] = useState(true);
    const [canScroll, setCanScroll] = useState({ next: false, prev: false });
    const [isTrackMenuOpen, setIsTrackMenuOpen] = useState(false);
    const [isTrackDrawerOpen, setIsTrackDrawerOpen] = useState(false);

    /* ---------- Local References ---------- */
    const containerRef = useRef<HTMLDivElement>(null);
    const trackMenuRef = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollNextFnRef = useRef<() => void>(() => { });
    const scrollPrevFnRef = useRef<() => void>(() => { });

    /* ---------- Stores ---------- */
    const { queueMap, addItemsToCustomQueue, removeItemFromQueue } = useQueueStore();

    /* ---------- Custom Hooks ---------- */
    const { dominantColor } = useDominantColor(trackDetails.coverImageUrl || "");
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const {breakPoint} = useBreakPoint();
    const { mutateAsync: likeTrack } = useLikeTrack();
    const { share } = useShare();

    /* ---------- Derived Values ---------- */
    const isAlbumPage = pathname.startsWith("/album");
    const queueItemid = isAlbumPage ? `Album-${id}-${trackDetails?._id}` : `Playlist-${id}-${trackDetails?._id}`;
    const hasTrackInQueue = queueMap[queueItemid];
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails?.hasLiked || false, trackId: trackDetails?._id || "" });

    /* ---------- Methods Or Functions ---------- */
    const handleProgressChange = (value: number[]) => {
        const audio = audioRef.current
        if (audio) {
            const newTimeInSeconds = (value[0] / 100) * audio.duration;
            audio.currentTime = newTimeInSeconds;
        }
    }

    const handleVolumeChange = () => {
        if (audioRef.current) {
            if (volumeEnabled) {
                audioRef.current.volume = 0;
                setVolumeEnabled(false)
            } else {
                audioRef.current.volume = 1;
                setVolumeEnabled(true)
            }
        }
    }

    const setScrollFunctions = (nextFn: () => void, prevFn: () => void) => {
        scrollNextFnRef.current = nextFn;
        scrollPrevFnRef.current = prevFn;
    }

    const handleAddOrRemoveQueue = () => {
        const entityType = isAlbumPage ? "Album" : "Playlist";
        const entityId = id;
        const trackId = trackDetails._id;

        if (hasTrackInQueue) {
            removeItemFromQueue(entityType, entityId || "", trackId);
        } else {
            addItemsToCustomQueue([trackDetails], entityType, entityId || "");
        }
    }

    const handleLikeUnlikeTrack = () => {
        likeTrack(trackDetails);
    }

    const handleShare = () => {
        share(`/track/${trackDetails._id}`);
    }

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
            action: handleLikeUnlikeTrack,
        },
        {
            icon: hasTrackInQueue ? <AlreadyAddedToQueueIcon width="16" height="16" /> : <AddToQueueIcon width="16" height="16" />,
            label: hasTrackInQueue ? "Remove From Queue" : "Add To Queue",
            action: handleAddOrRemoveQueue,
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
                navigate(`/album/${trackDetails?.albumId}`);
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
            action: handleShare,
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
        setTrackDetails({
            _id: tracks[activeIndex]._id,
            title: tracks[activeIndex].title,
            coverImageUrl: tracks[activeIndex].coverImageUrl || "",
            audioUrl: tracks[activeIndex].audioUrl,
            artist: tracks[activeIndex].artist,
            duration: tracks[activeIndex].duration || 0,
            genres: tracks[activeIndex].genres,
            albumId: tracks[activeIndex].albumId || "",
            albumName: tracks[activeIndex].albumName,
            language: tracks[activeIndex].language,
            hasLiked: tracks[activeIndex].hasLiked,
            createdAt: tracks[activeIndex].createdAt,
            updatedAt: tracks[activeIndex].updatedAt,
            isPlaying: true,
        })
    }, [activeIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        // Handle browser media control events
        const handlePlay = () => {
            setTrackDetails({ ...trackDetails, isPlaying: true });
        };

        const handlePause = () => {
            setTrackDetails({ ...trackDetails, isPlaying: false });
        };

        const handleTimeUpdate = () => {
            setProgress([(audio.currentTime / audio.duration) * 100]);
        };

        const handleAudioEnd = () => {
            scrollNextFnRef.current()
        }

        // Attach event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            // Clean up event listeners
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [trackDetails]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-grayscale-[100%] z-700">
            {/* Your modal content */}
            <div
                ref={containerRef}
                className="flex flex-col gap-4 py-6 text-white  border border-[#1F1F1F] rounded-md w-full max-w-[815px] shadow-lg"
                style={{
                    background: `linear-gradient(${dominantColor || "#3C3C3C"}, #121212)`,
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center w-full px-6">
                    <h1 className="font-bold text-md whitespace-nowrap truncate">
                        {trackDetails.title}
                    </h1>
                    <div className="flex items-center gap-8">
                        <button
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                            onClick={handleVolumeChange}
                        >
                            {/* Volume Icon */}
                            {
                                volumeEnabled ? (
                                    <HighVolumeIcon />
                                ) : (
                                    <MuteVolumeIcon />
                                )
                            }
                        </button>
                        <button
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                            onClick={onClose}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                </div>

                {/* Center: 3-part layout */}
                <div className="flex items-center justify-between px-10 -mb-[14px] -mt-[14px]">
                    {/* Part 1: Track Info */}
                    <div className="hidden md:flex flex-col gap-2">
                        <div className="max-w-xs"> {/* set a max-width so truncate can work */}
                            <h2 className="text-3xl font-bold truncate">
                                {trackDetails.title}
                            </h2>
                            <p className="text-md text-white/70 mt-2 truncate">
                                {trackDetails.artist}
                            </p>
                        </div>

                        <div className="flex items-center gap-5 mt-3">
                            <div className="w-14 h-14">
                                {
                                    trackDetails.coverImageUrl ? (
                                        <img
                                            src={trackDetails.coverImageUrl}
                                            alt="Small Thumbnail"
                                            className="h-full w-full object-cover rounded-[4px]"
                                        />
                                    ) : (
                                        <PreviewEntityDialogMusicPlaceHolder reduceIconSize={true} />
                                    )
                                }
                            </div>

                            {/* Reduced width of the progress bar */}
                            <div className="w-45 rounded-full">
                                <Slider
                                    defaultValue={[0]}
                                    value={progress}
                                    onValueChange={handleProgressChange}
                                    className="w-full cursor-grab"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Part 2: Track Art */}
                    <div className=''>
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            orientation="vertical"
                            className="w-full max-w-xs"
                            setApi={(api: CarouselApi) => {
                                let scrollNextFn = () => { };
                                let scrollPrevFn = () => { };
                                if (api?.scrollNext) {
                                    scrollNextFn = api?.scrollNext
                                }
                                if (api?.scrollPrev) {
                                    scrollPrevFn = api.scrollPrev
                                }
                                setScrollFunctions(scrollNextFn, scrollPrevFn)

                                api?.on("select", () => {
                                    const activeIndex = api.selectedScrollSnap();
                                    setActiveIndex(activeIndex)
                                    let canScrollNext = false;
                                    let canScrollPrev = false;

                                    if (api.canScrollNext()) {
                                        canScrollNext = true
                                    }

                                    if (api.canScrollPrev()) {
                                        canScrollPrev = true
                                    }

                                    setCanScroll({
                                        next: canScrollNext,
                                        prev: canScrollPrev
                                    })
                                });

                            }}
                        >
                            <CarouselContent className="h-[350px]">
                                {tracks.map((track, index) => (
                                    <CarouselItem key={index} className="flex justify-center items-center h-full">
                                        <div className="w-53 h-53">
                                            {
                                                track.coverImageUrl ? (
                                                    <img
                                                        src={track.coverImageUrl} // Replace with your image URL
                                                        alt={`Slide ${index + 1}`}
                                                        className="object-cover w-full h-full rounded-md"
                                                    />
                                                ) : (
                                                    <PreviewEntityDialogMusicPlaceHolder />
                                                )
                                            }
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>

                    {/* Part 3: Track Controls */}
                    <div className="flex flex-col justify-between items-center gap-7 mr-6">
                        {/* More Icon */}
                        <div className="relative -mb-3.5" ref={trackMenuRef}>
                            <button
                                className="text-white/70 dynamic-text-hover cursor-pointer"
                                onClick={() => {
                                    if(breakPoint == "md"){
                                        setIsTrackMenuOpen(true);
                                    } else {
                                        setIsTrackDrawerOpen(true);
                                    }
                                }}
                            >
                                <MoreIcon width="30" height="30" />
                            </button>

                            {
                                isTrackMenuOpen && (
                                    <EntityOptionsMenu
                                        options={trackMenuOptions}
                                        entityMenuRef={trackMenuRef}
                                        onClose={() => setIsTrackMenuOpen(false)}
                                    />
                                )
                            }

                            {
                                isTrackDrawerOpen && ( // todo
                                    <EntityOptionsDrawer
                                        entity={{
                                            title: trackDetails.title,
                                            imgUrl: trackDetails.coverImageUrl || ""
                                        }}
                                        options={trackMenuOptions}
                                        height="500px"
                                        onClose={() => setIsTrackDrawerOpen(false)}
                                    />
                                )
                            }
                        </div>

                        {/* Share Icon */}
                        <button
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                            onClick={handleShare}
                        >
                            <ShareIcon width="21" height="21" />
                        </button>

                        {/* Queue Icon */}
                        <button
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                            onClick={handleAddOrRemoveQueue}
                        >
                            {
                                hasTrackInQueue ? <AlreadyAddedToQueueIcon width="21" height="21" /> : <AddToQueueIcon width="21" height="21" />
                            }
                        </button>

                        {/* Add Icon */}
                        <button
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                            onClick={handleLikeUnlikeTrack}
                        >
                            {
                                hasLiked ? (
                                    <SavedIcon width="24" height="24" />
                                ) : (
                                    <AddIcon width="24" height="24" />
                                )
                            }
                        </button>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-between px-7">
                    <button>
                        {/* Dont remove this */}
                    </button>
                    {
                        activeIndex == 0 ? (
                            <button
                                className="cursor-pointer text-black bg-white dynamic-bg-hover font-bold px-[24.5px] py-[10px] rounded-full flex items-center gap-2 transition-all duration-300 animate-bounce"
                                style={{
                                    '--bgHoverColor': '#d1d5dc',
                                } as React.CSSProperties}
                                onClick={scrollNextFnRef.current}
                            >
                                Next
                                <span className="-rotate-90 transform">
                                    <BackArrowIcon width="28" height="28" />
                                </span>
                            </button>
                        ) : (
                            <div className="space-y-2 -mt-14">
                                <button
                                    className={`${canScroll.prev ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"} hover:bg-white/30 text-white/70 font-bold p-3 rounded-full flex items-center`}
                                    onClick={scrollPrevFnRef.current}
                                >
                                    <span className="rotate-180 transform">
                                        <DownArrowIcon width="24" height="24" />
                                    </span>
                                </button>

                                <button
                                    className={`${canScroll.next ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"} hover:bg-white/30 text-white/70 font-bold p-3 rounded-full flex items-center`}
                                    onClick={scrollNextFnRef.current}
                                >
                                    <span className="">
                                        <DownArrowIcon width="24" height="24" />
                                    </span>
                                </button>
                            </div>
                        )
                    }

                    {
                        trackDetails._id && (
                            <audio ref={audioRef} src={trackDetails.audioUrl} autoPlay />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PreviewEntityModal