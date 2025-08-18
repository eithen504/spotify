import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import NowPlayingSection from './NowPlayingSection';
import NextInQueueSection from './NextInQueueSection';

interface QueueViewProps {
    rightPanelSize: number;
}

const QueueView: React.FC<QueueViewProps> = ({ rightPanelSize }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const sidebarRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const sidebarEl = sidebarRef.current
        if (!sidebarEl) return

        const handleScroll = () => {
            if (sidebarEl.scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        sidebarEl.addEventListener('scroll', handleScroll)

        return () => {
            sidebarEl.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <aside
            className="hidden lg:flex bg-[#121212] text-[#ffffff] group relative h-full flex-col overflow-y-auto hide-scrollbar"
            style={{ width: `${rightPanelSize}%` }}
            ref={sidebarRef}
        >
            {/* Fixed header section */}
            <Header isScrolled={isScrolled} />

            <div className="flex-1">
                {/* Now Playing Section */}
                <NowPlayingSection />

                {/* Next In Queue Section */}
                <NextInQueueSection />
            </div>
        </aside>
    )
}

export default QueueView