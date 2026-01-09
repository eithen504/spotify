import React, { useRef } from 'react'
import { useUIPreferencesStore } from '../store/useUIPreferenceStore';
import type { MenuOptions, TableColumns, Track, TrackMenuState } from '../types';
import { formatDate, formatDuration } from '../utils';
import { AddIcon, MoreIcon, PauseIcon, PlayIcon, SavedIcon } from '../Svgs';
import { EntityTrackMusicPlaceholder } from './Placeholders';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLikeTrack, useTrackLikeStatus } from '../hooks/like';
import { useTrackDetailsStore } from '../store/useTrackDetailsStore';
import { useBreakPoint } from '../hooks/breakPoint';
import EntityOptionsMenu from './EntityOptionsMenu';
import EntityOptionsDrawer from './EntityOptionsDrawer';
import { useTableColumnVisibilityStore } from '../store/useTableColumnVisibilityStore';
import { useCheckAuth } from '../hooks/auth';
import { toast } from 'sonner';

type EntityTracksProps = {
    tracks: Track[]
    tableColumns: TableColumns;
    isPlayingCurrentEntity: boolean;
    trackMenuOptions: MenuOptions;
    entityDrawerHeight?: string;
    trackMenu: TrackMenuState;
    setTrackMenu: React.Dispatch<React.SetStateAction<TrackMenuState>>
    handlePlayPauseTrack: (track: Track, isPlayingCurrentTrack: boolean, source?: "PlayButton" | "EntityTracks") => void;
}

const EntityTracks: React.FC<EntityTracksProps> = ({
    tracks,
    tableColumns,
    isPlayingCurrentEntity,
    trackMenuOptions,
    entityDrawerHeight,
    trackMenu,
    setTrackMenu,
    handlePlayPauseTrack
}) => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const trackMenuRefs = useRef<Array<HTMLDivElement | null>>([]);

    /* ---------- Stores ---------- */
    const { leftSidebar, rightSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { showNowPlayingView, showQueueView } = rightSidebar;
    const { trackDetails } = useTrackDetailsStore();
    const { tableView } = useTableColumnVisibilityStore();

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { breakPoint } = useBreakPoint();
    const { getTrackLikeStatus } = useTrackLikeStatus();
    const { mutateAsync: likeTrack } = useLikeTrack();

    /* ---------- Derived Values ---------- */
    const isAlbumPage = pathname.startsWith("/album");
    let { isOpen: isCurrenTrackMenuOpen, track: currentMenuTrack } = trackMenu;

    /* ---------- Methods Or Functions ---------- */
    const handleMoreIconClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, track: Track) => {
        e.stopPropagation();
        if (!currentUser) {
            toast.error("Please Login or Signup First!");
            return;
        };
        setTrackMenu({ isOpen: true, track });
    }

    return (
        <div className='px-1 md:px-6'>
            {tracks?.map((track, index) => {
                let isPlayingCurrentTrack = (isPlayingCurrentEntity && trackDetails._id == track._id);
                const hasLiked = getTrackLikeStatus({ hasLiked: track.hasLiked, trackId: track._id });
                const isMenuOpen = (isCurrenTrackMenuOpen && currentMenuTrack?._id == track._id);

                return (
                    <div
                        key={track._id}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 dynamic-bg-hover transition rounded-none md:rounded-[5px] group"
                        style={{
                            '--bgHoverColor': '#2A2A2A',
                        } as React.CSSProperties}
                        onClick={() => handlePlayPauseTrack(track, isPlayingCurrentTrack)}
                    >
                        <div className="w-6 text-white/70 hidden md:block relative">
                            <div
                                className={`opacity-100 group-hover-opacity transition-opacity`}
                                style={{
                                    '--initialOpacity': '1',
                                    '--hoverOpacity': '0',
                                } as React.CSSProperties}
                            >
                                {
                                    isPlayingCurrentTrack ? (
                                        <div className="transform wave-left">
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index} className="wave-bar"></div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )
                                }
                            </div>

                            <button className="absolute inset-0 group-hover-opacity dynamic-text-group-hover transition-opacity cursor-pointer">
                                {
                                    isPlayingCurrentTrack ? <PauseIcon width="14" height="14" /> : <PlayIcon width="14" height="14" />
                                }
                            </button>
                        </div>

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            {
                                tableView == "Default List" && !isAlbumPage && (
                                    track.coverImageUrl ? (
                                        <img
                                            src={track.coverImageUrl}
                                            alt={'track.title'}
                                            className="w-[50px] h-[50px] md:w-[42px] md:h-[42px] object-cover rounded-[4px] flex-shrink-0"
                                        />
                                    ) : (
                                        <EntityTrackMusicPlaceholder />
                                    )
                                )
                            }

                            <div className="min-w-0">
                                <div className={`${isPlayingCurrentTrack ? "text-[#3BE477]" : ""} font-medium truncate text-[16px]`}>
                                    <span
                                        className="cursor-pointer hover:underline"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/track/${track._id}`);
                                        }}
                                    >
                                        {track.title}
                                    </span>
                                </div>

                                {
                                    tableView == "Default List" && (
                                        <div className="text-white/70 dynamic-text-group-hover text-sm truncate">{track.artist}</div>
                                    )
                                }
                            </div>
                        </div>

                        {
                            tableView == "Compact List" ? (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className="text-white/70">
                                            {tableColumns["ARTIST"]?.visible && track.artist}
                                        </span>
                                    </div>

                                    <div className={`w-32 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className="hover:underline cursor-pointer text-white/70 dynamic-text-hover"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/album/${track.albumId}`)
                                            }}
                                        >
                                            {tableColumns["ALBUM"]?.visible && track.albumName}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className="text-white/70 dynamic-text-hover hover:underline cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/album/${track.albumId}`)
                                            }}
                                        >
                                            {tableColumns["ALBUM"]?.visible && track.albumName}
                                        </span>
                                    </div>

                                    <div className={`w-32 text-white/70 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        {tableColumns["DATE ADDED"]?.visible && formatDate(track.createdAt)}
                                    </div>
                                </>
                            )
                        }

                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            <button
                                className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    likeTrack(track);
                                }}
                                title={hasLiked ? "Remove" : "Add"}
                            >
                                {
                                    hasLiked ? <SavedIcon width="16" height="16" /> : <AddIcon width="16" height="16" />
                                }
                            </button>

                            <span className="truncate text-white/70">
                                {tableColumns["DURATION"]?.visible && formatDuration(track.duration)}
                            </span>

                            <div
                                ref={el => {
                                    trackMenuRefs.current[index] = el;
                                }}
                                className="relative ml-auto flex items-center"
                            >
                                <button
                                    className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity"
                                    onClick={(e) => handleMoreIconClick(e, track)}
                                >
                                    <MoreIcon width="20" height="20" />
                                </button>

                                {/* Track Options Menu */}
                                {
                                    isMenuOpen && (
                                        <EntityOptionsMenu
                                            options={trackMenuOptions}
                                            entityMenuRef={{ current: trackMenuRefs.current[index] }}
                                            subMenuleftShift={true}
                                            rightPosition={((!showNowPlayingView && !showQueueView) || breakPoint == "md") ? "45px" : ""}
                                            onClose={() => setTrackMenu({ isOpen: false, track: currentMenuTrack })}
                                        />
                                    )
                                }
                            </div>
                        </div>

                        {/* for small screen */}
                        <div className="w-16 text-right justify-end items-center gap-1 flex md:hidden">
                            <div className="text-white/70 dynamic-text-hover relative flex justify-center items-center">
                                <button
                                    className="rotate-90 cursor-pointer"
                                    onClick={(e) => handleMoreIconClick(e, track)}
                                >
                                    <MoreIcon />
                                </button>

                                {/* Track Options Drawer */}
                                {
                                    (breakPoint == "sm" && isMenuOpen) && (
                                        <EntityOptionsDrawer
                                            entity={{
                                                title: currentMenuTrack?.title,
                                                imgUrl: currentMenuTrack?.coverImageUrl
                                            }}
                                            options={trackMenuOptions || []}
                                            onClose={() => setTrackMenu({ isOpen: false, track: currentMenuTrack })}
                                            height={entityDrawerHeight}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default EntityTracks