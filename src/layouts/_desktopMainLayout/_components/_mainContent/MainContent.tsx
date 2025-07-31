import LeftSidebar from './_leftSidebar/LeftSidebar'
import { Outlet } from 'react-router-dom'
import NowPlayingView from './_nowPlayingView/NowPlayingView'
import { useEffect, useRef, useState } from 'react';
import type { ResizePanel } from '../../../../Types';

const MainContent = () => {
    const [activeResizePanel, setActiveResizePanel] = useState<ResizePanel>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [leftPanelSize, setLeftPanelSize] = useState(22);
    const [rightPanelSize, setRightPanelSize] = useState(20);

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
            if (newSize <= 7) {
                setLeftPanelSize(7)
            }
            if (newSize >= 22 && newSize <= 38) {
                setLeftPanelSize(newSize)
            }

        } else if (activeResizePanel === 'right') {
            // Calculate right panel size (100% - drag position)
            const rightSize = 100 - newSize;

            if (rightSize >= 20 && rightSize <= 25) {
                setRightPanelSize(rightSize)
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

    console.log("rigth", rightPanelSize);

    return (
        <main className="flex flex-1 bg-[#000000] text-white overflow-hidden px-2 gap-0"
            ref={containerRef}
        >
            {/* Left Sidebar */}
            <LeftSidebar leftPanelSize={leftPanelSize} />

            <div className="flex items-center justify-center h-full w-2 cursor-grab group"
                onMouseDown={() => startResizing('left')}
                onTouchStart={() => startResizing('left')}
            >
                <div
                    className="w-[1px] h-[97%] bg-transparent group-hover:bg-white cursor-grab transition duration-300 ease-in-out touch-none"
                />
            </div>

            {/* Children/Main Center Content */}
            <section className="flex-1 bg-[#121212] p-6 flex justify-center items-start custom-scrollbar overflow-y-auto rounded-md">
                <div className="w-full max-w-3xl">
                    <Outlet />
                </div>
            </section>

            <div className="hidden lg:flex items-center justify-center h-full w-2 cursor-grab group"
                onMouseDown={() => startResizing('right')}
                onTouchStart={() => startResizing('right')}
            >
                <div
                    className="w-[1px] h-[97%] bg-transparent group-hover:bg-white cursor-grab transition duration-300 ease-in-out touch-none"
                />
            </div>

            {/* Right Sidebar */}
            <NowPlayingView rightPanelSize={rightPanelSize} />
        </main>
    )
}

export default MainContent