import React from 'react'
import { useScrollStore } from '../../../store/useScrollStore'
import { PlayIcon } from '../../../Svgs';

const PlaylistHeader = () => {
    const {scrollFromTop} = useScrollStore();
 
    return (
        <header className={`max-w-[90rem] mx-auto flex gap-3 shadow-[0_4px_5px_rgba(0,0,0,0.1)] fixed md:sticky top-0 left-0 w-full z-50 px-4 md:px-6 py-[8.2px] items-center mb-[0px] md:-mb-[64px]`}
            style={{
                opacity: scrollFromTop / 250,
                background: '#2D2453'
            }}
        >
            <button
                className={`${scrollFromTop >= 250
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    } transition-opacity duration-500 ease-in-out mt-0.5 cursor-pointer p-3.5 rounded-full text-black bg-[#1ed760] dynamic-bg-hover`}
                style={{
                    '--bgHoverColor': '#3BE477',
                } as React.CSSProperties}
            >
                <PlayIcon width="18" height="18" />
            </button>

            <h2 className={`${scrollFromTop >= 250 ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ease-in-out text-2xl font-bold truncate overflow-hidden whitespace-nowrap`}>
                {'title'}
            </h2>

        </header>
    )
}

export default PlaylistHeader