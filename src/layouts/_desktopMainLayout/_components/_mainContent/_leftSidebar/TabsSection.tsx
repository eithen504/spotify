import { useEffect, useRef, useState } from 'react';
import { LEFT_SIDEBAR_TABS } from '../../../../../Constants';
import { LeftArrowIcon, RightArrowIcon } from '../../../../../Svgs'

const TabsSection = () => {
    const scrollRef = useRef(null);
    const [canScroll, setCanScroll] = useState({ left: false, right: false });

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


    return (
        <div className="relative px-5">
            {
                canScroll.left && (
                    <>
                        <button className="absolute left-5 top-0 text-[#8f8f8f] hover:text-[#ffffff] bg-[#1f1f1f] hover:bg-[#2A2A2A] cursor-pointer rounded-full p-[7px] pointer-events-auto z-20"
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
                            className="bg-[#2a2a2a] hover:bg-[#303030] cursor-pointer px-3 py-[6px] rounded-full text-sm font-medium"
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>
            {
                canScroll.right && (
                    <>
                        <button className="absolute right-5 top-0 text-[#8f8f8f] hover:text-[#ffffff] bg-[#1f1f1f] hover:bg-[#2A2A2A] cursor-pointer rounded-full p-[7px] pointer-events-auto z-20"
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