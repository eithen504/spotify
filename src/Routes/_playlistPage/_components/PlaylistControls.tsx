import React from 'react'
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';
import { AddIcon, DefaultListIcon, MoreIcon, PlayIcon, ShareIcon } from '../../../Svgs';

const PlaylistControls = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}>
            <button
                className={`p-[19px] hidden md:block text-black bg-[#1ed760] dynamic-bg-hover rounded-full cursor-pointer`}
                style={{
                    '--bgHoverColor': '#3BE477',
                } as React.CSSProperties}
            >
                <PlayIcon width="18" height="18" />
            </button>

            <div className={`${leftPanelSize <= 28 ? "w-[38px] h-12" : "w-[34px] h-11"} flex-shrink-none relative rounded-md cursor-pointer group`}>
                {/* Image container */}
                <div className="absolute inset-0 overflow-hidden rounded-md p-1">
                    <img
                        src={"https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4"}
                        className="w-full h-full object-cover transition-opacity"
                    />
                </div>

                {/* Play button - hidden by default, shown on hover */}
                <div className="absolute inset-0 flex items-center justify-center group-hover-opacity transition-opacity">
                    <PlayIcon width="15" height="15" />
                </div>

                {/* Animated border parts */}
                <div className="absolute inset-0">
                    {/* Top border - animates from left to right */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/80 animate-border-top"></div>

                    {/* Right border - animates from top to bottom */}
                    <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/80 animate-border-right"></div>

                    {/* Bottom border - animates from right to left */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 animate-border-bottom"></div>

                    {/* Left border - animates from bottom to top */}
                    <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-white/80 animate-border-left"></div>
                </div>
            </div>

            <button className="text-white/70 dynamic-text-hover cursor-pointer">
                <AddIcon width="27" height="27" />
            </button>

            <button className="text-white/70 dynamic-text-hover cursor-pointer -mt-1"
            >
                <ShareIcon width="25" height="25" />
            </button>

            <button className="text-white/70 dynamic-text-hover cursor-pointer"
            >
                <MoreIcon width="30" height="30" />
            </button>

            <button className="hidden md:flex text-white/70 dynamic-text-hover cursor-pointer ml-auto items-center gap-1.5"
            >
                {
                    leftPanelSize <= 23 && (
                        <span className="">{"selectedView"}</span>
                    )
                }

                <DefaultListIcon width="15" height="15" />
            </button>


            <button
                className="block md:hidden text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-[19px] ml-auto cursor-pointer"
                style={{
                    '--bgHoverColor': '#3BE477',
                } as React.CSSProperties}
            >
                <PlayIcon width="18" height="18" />
            </button>

        </div>
    )
}

export default PlaylistControls