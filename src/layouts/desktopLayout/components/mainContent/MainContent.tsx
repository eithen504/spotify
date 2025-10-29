
import { Outlet, useLocation } from 'react-router-dom';
import { useCheckAuth } from '../../../../hooks/auth';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ResizePanel } from '../../../../types';
import { useBreakPoint } from '../../../../hooks/breakPoint';
import { useScrollStore } from '../../../../store/useScrollStore';
import LeftSidebar from './leftSidebar/LeftSidebar';
import { useUIPreferencesStore } from '../../../../store/useUIPreferenceStore';
import NowPlayingView from './nowPlayingView/NowPlayingView';
import QueueView from './queueView/QueueView';
import ExpandedNowPlayingView from './expandedNowPlayingView/ExpandedNowPlayingView';

const MainContent = () => {
    const { pathname } = useLocation();
    const [activeResizePanel, setActiveResizePanel] = useState<ResizePanel>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const { breakPoint } = useBreakPoint();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const { preferences: { leftPanelSize, rightPanelSize, isLeftSidebarExpanded, showNowPlayingView, showQueueView, isNowPlayingViewExpanded }, setPreferences } = useUIPreferencesStore();
    const { setIsScrolled, setScrollFromTop } = useScrollStore()
    const { data: currentUser } = useCheckAuth();

    const startResizing = (panel: 'left' | 'right') => {
        setActiveResizePanel(panel);
        setIsResizing(true);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grab';
    };

    const stopResizing = () => {
        setActiveResizePanel(null);
        setIsResizing(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    };

    const resize = (clientX: number) => {
        if (!activeResizePanel || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const newSize = ((clientX - rect.left) / rect.width) * 100;

        if (activeResizePanel === 'left') {
            if (breakPoint == "lg") {
                if (newSize <= 7) {
                    setPreferences({ leftPanelSize: 7 })
                    localStorage.setItem("leftPanelSize", "7")
                }
                if (newSize >= 22 && newSize <= 38) {
                    setPreferences({ leftPanelSize: newSize })
                    localStorage.setItem("leftPanelSize", `${newSize}`)
                }
            }
            if (breakPoint == "md") {
                if (newSize <= 10) {
                    setPreferences({ leftPanelSize: 10 });
                    localStorage.setItem("leftPanelSize", "10");
                }

                if (newSize >= 32 && newSize <= 38) {
                    setPreferences({ leftPanelSize: newSize });
                    localStorage.setItem("leftPanelSize", `${newSize}`);
                }
            }

        } else if (activeResizePanel === 'right') {
            // Calculate right panel size (100% - drag position)
            const rightSize = 100 - newSize;

            if (rightSize >= 20 && rightSize <= 25) {
                setPreferences({ rightPanelSize: rightSize })
                localStorage.setItem("rightPanelSize", `${rightSize}`);
            }
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            resize(e.clientX);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                resize(e.touches[0].clientX);
            }
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', stopResizing);
            window.addEventListener('touchend', stopResizing);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', stopResizing);
            window.removeEventListener('touchend', stopResizing);
        };
    }, [isResizing, activeResizePanel]);

    useEffect(() => {
        const element = scrollSectionRef.current;
        if (!element) return;

        const onScroll = () => {
            if (element.scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }

            setScrollFromTop(element.scrollTop)
        };

        element.addEventListener("scroll", onScroll);
        return () => element.removeEventListener("scroll", onScroll);
    }, [scrollSectionRef.current]);

    useLayoutEffect(() => {
        const element = scrollSectionRef.current;
        if (!element) return;

        element.scrollTop = 0;
        setIsScrolled(false)
        setScrollFromTop(0)
    }, [pathname, isNowPlayingViewExpanded, isLeftSidebarExpanded]);

    return (
        <main className="flex flex-1 bg-[#000000] text-[#ffffff] overflow-hidden px-2 gap-0"
            ref={containerRef}
        >
            {
                isNowPlayingViewExpanded ? (
                    <ExpandedNowPlayingView />
                ) : (
                    <>
                        {/* Left Sidebar */}
                        {
                            currentUser && <LeftSidebar leftPanelSize={leftPanelSize} />
                        }
 
                        {
                            !isLeftSidebarExpanded && (
                                <>
                                    {
                                        currentUser && (
                                            <div
                                                onMouseDown={() => startResizing('left')}
                                                onTouchStart={() => startResizing('left')}
                                                className="w-2 bg-black cursor-grab transition-colors touch-none group relative"
                                            >
                                                {/* Center white bar on hover */}
                                                <div
                                                    className={`w-[0.5px] h-[96%] dynamic-bg-group-hover ${activeResizePanel == "left" ? "bg-[#ffffff]" : ""} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300 ease-in-out touch-none`}
                                                />
                                            </div>
                                        )
                                    }

                                    {/* Children/Main Center Content */}
                                    <section className={`flex-1 bg-[#121212] rounded-md overflow-y-auto hide-scrollbar`}
                                        ref={scrollSectionRef}
                                    >
                                        <Outlet />
                                    </section>

                                    {
                                        (currentUser && (showNowPlayingView || showQueueView)) && (
                                            <>
                                                <div
                                                    onMouseDown={() => startResizing('right')}
                                                    onTouchStart={() => startResizing('right')}
                                                    className="hidden lg:flex w-2 bg-black cursor-grab transition-colors touch-none group relative"
                                                >
                                                    {/* Center white bar on hover */}
                                                    <div
                                                        className={`w-[0.5px] h-[96%] dynamic-bg-group-hover ${activeResizePanel == "right" ? "bg-[#ffffff]" : ""} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-300 ease-in-out touch-none`}
                                                    />
                                                </div>

                                                {/* Right Sidebar */}
                                                {
                                                    showNowPlayingView ? <NowPlayingView rightPanelSize={rightPanelSize} /> : <QueueView rightPanelSize={rightPanelSize} />
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }

        </main>
    )
}

export default MainContent