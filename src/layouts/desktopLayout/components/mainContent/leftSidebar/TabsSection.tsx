import React, { useEffect, useRef, useState } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../../../../../Svgs'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { LEFT_SIDEBAR_TABS } from '../../../../../constants';

const TabsSection = () => {
    const scrollRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });
    const { preferences: { leftPanelSize, leftSidebarActiveTab }, setPreferences } = useUIPreferencesStore();

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
            const scrollAmount = direction === 'left' ? -70 : 70;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            // Update scroll buttons after scrolling
            setTimeout(checkScrollability, 300);
        }
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, []);

    useEffect(() => {
        checkScrollability()
    }, [leftPanelSize])

    return (
        <>
            {
                leftPanelSize >= 22 ? (
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
                                LEFT_SIDEBAR_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        className={`${leftSidebarActiveTab == tab ? "text-[#000000] bg-[#ffffff]" : "bg-[#2a2a2a] dynamic-bg-hover"} cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium`}
                                        style={{
                                            '--bgHoverColor': '#303030',
                                        } as React.CSSProperties}
                                        onClick={() => {
                                            setPreferences({ leftSidebarActiveTab: tab })
                                            localStorage.setItem("leftSidebarActiveTab", tab)
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
                ) : (
                    <></>
                )
            }
        </>

    )
}

export default TabsSection