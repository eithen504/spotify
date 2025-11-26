import React, { useEffect, useRef, useState } from 'react';
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';
import { LeftArrowIcon, RightArrowIcon } from '../../../Svgs';
import { LIBRARY_TABS } from '../../../constants';

const TabsSection = () => {
    /* ---------- Local States ---------- */
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

    /* ---------- Local References ---------- */
    const scrollRef = useRef(null);

    /* ---------- Stores ---------- */
    const { leftSidebar, library, setLibrary } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { activeTab: libraryActiveTab } = library;

    /* ---------- Methods Or Functions ---------- */
    const checkScrollability = () => {
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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const container = scrollRef.current as HTMLDivElement;
            const scrollAmount = direction === 'left' ? -70 : 70;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, []);

    useEffect(() => {
        checkScrollability()
    }, [leftPanelSize])

    return (
        <div className="relative px-5">
            {
                canScroll.left && (
                    <>
                        <button
                            className="absolute left-5 top-0 text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover cursor-pointer rounded-full p-[7px] pointer-events-auto z-20"
                            style={{
                                '--bgHoverColor': '#282828',
                            } as React.CSSProperties}
                            onClick={() => scroll("left")}
                        >
                            <LeftArrowIcon width="18" height="18" />
                        </button>

                        {/* Enhanced right-side shadow (deeper and darker) */}
                        <div className="absolute left-5 top-0 bottom-0 w-16 bg-gradient-to-r from-[#121212] via-[#121212]/70 to-transparent pointer-events-none z-10" />
                    </>
                )
            }
            <div className="flex space-x-2 mb-4 overflow-x-auto whitespace-nowrap hide-scrollbar"
                ref={scrollRef}
                onScroll={checkScrollability}
            >
                {
                    LIBRARY_TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`${libraryActiveTab == tab ? "text-[#000000] bg-[#ffffff]" : "bg-[#2a2a2a] dynamic-bg-hover"} cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium`}
                            style={{
                                '--bgHoverColor': '#303030',
                            } as React.CSSProperties}
                            onClick={() => {
                                setLibrary({ activeTab: tab });
                            }}
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>
            {
                canScroll.right && (
                    <>
                        <button
                            className="absolute right-5 top-0 text-[#8f8f8f] dynamic-text-hover bg-[#1F1F1F] dynamic-bg-hover cursor-pointer rounded-full p-[7px] pointer-events-auto z-20"
                            style={{
                                '--bgHoverColor': '#282828',
                            } as React.CSSProperties}
                            onClick={() => scroll("right")}
                        >
                            <RightArrowIcon width="18" height="18" />
                        </button>

                        {/* Enhanced right-side shadow (deeper and darker) */}
                        <div className="absolute right-5 top-0 bottom-0 w-16 bg-gradient-to-l from-[#121212] via-[#121212]/70 to-transparent pointer-events-none z-10" />
                    </>
                )
            }
        </div>
    )
}

export default TabsSection