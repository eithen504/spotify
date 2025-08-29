import React from 'react'
import type { Column, Track } from '../../Types';
import { useUIPreferencesStore } from '../../store/useUIPreferenceStore';
import { AddIcon, MoreIcon, MusicIcon, PlayIcon } from '../../Svgs';
import { formatDate } from '../../utils';
import MusicEntityTrackPlaceholder from './placeholders/MusicEntityTrackPlaceholder';

interface EntityTracksProps {
    tracks: Track[]
    view: "Compact List" | "Default List";
    columns: Record<Column, boolean>;
}

const EntityTracks: React.FC<EntityTracksProps> = ({ tracks, view, columns }) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div className='px-1 md:px-6'>
            {tracks?.map((track, index) => {

                return (
                    <div
                        key={track._id}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 dynamic-bg-hover transition rounded-none md:rounded-[5px] group"
                        style={{
                            '--bgHoverColor': '#2A2A2A',
                        } as React.CSSProperties}
                    >
                        <div className="w-6 text-white/70 hidden md:block relative">
                            <span
                                className={`opacity-100 group-hover-opacity transition-opacity`}
                                style={{
                                    '--initialOpacity': '1',
                                    '--hoverOpacity': '0',
                                } as React.CSSProperties}
                            >
                                {index + 1}
                            </span>

                            <button className="absolute inset-0 group-hover-opacity dynamic-text-group-hover transition-opacity cursor-pointer">
                                <PlayIcon width="14" height="14" />
                            </button>
                        </div>

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            {
                                view == "Default List" && (
                                    track.coverImageUrl ? (
                                        <img
                                            src={track.coverImageUrl}
                                            alt={'track.title'}
                                            className="w-[50px] h-[50px] md:w-[42px] md:h-[42px] object-cover rounded-[4px] flex-shrink-0"
                                        />
                                    ) : (
                                       <MusicEntityTrackPlaceholder/>
                                    )
                                )
                            }

                            <div className="min-w-0">
                                <div className={`font-medium truncate text-[16px] cursor-pointer hover:underline`}>
                                    {track.title}
                                </div>

                                {
                                    view == "Default List" && (
                                        <div className="text-white/70 dynamic-text-group-hover text-sm truncate">{track.artist}</div>
                                    )
                                }
                            </div>
                        </div>

                        {
                            view == "Compact List" ? (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className="text-white/70">
                                            {columns["Artist"] && track.artist}
                                        </span>
                                    </div>

                                    <div className={`w-32 text-white/70 truncate text-sm ml-5 dynamic-text-hover hover:underline cursor-pointer ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        {columns["Album"] && track.albumName}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`flex-1 truncate ml-5 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        <span className="text-white/70 dynamic-text-hover hover:underline cursor-pointer">
                                            {columns["Album"] && track.albumName}
                                        </span>
                                    </div>

                                    <div className={`w-32 text-white/70 truncate text-sm ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"}`}>
                                        {columns["Date added"] && formatDate(track.createdAt)}
                                    </div>
                                </>
                            )
                        }

                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            <button className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity">
                                <AddIcon width="17" height="17" />
                            </button>

                            <span className="truncate text-white/70">
                                {columns["Duration"] ? "0:24" : ""}
                            </span>

                            <button className="text-white/70 dynamic-text-hover cursor-pointer group-hover-opacity">
                                <MoreIcon width="21" height="21" />
                            </button>
                        </div>

                        {/* for small screen */}
                        <div className="w-16 text-right justify-end items-center cursor-pointer gap-1 flex md:hidden">
                            <div className="rotate-90 text-white/70 dynamic-text-hover">
                                <MoreIcon />
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default EntityTracks