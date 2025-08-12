import React, { useEffect, useRef, useState } from "react"
import CreditSection from "./CreditSection"
import Header from "./Header"
import QueueSection from "./QueueSection"
import TrackInfo from "./TrackInfo"

interface NowPlayingViewProps {
    rightPanelSize: number;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ rightPanelSize }) => {
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
            {/* Header */}
            <Header isScrolled={isScrolled} />

            {/* Scrollable Content */}
            <div className="flex-1 px-4 pb-4">
                {/* Track Info */}
                <TrackInfo />

                {/* Credit Section */}
                <CreditSection />

                {/* Queue Section */}
                <QueueSection />
            </div>
        </aside>
    )
}

export default NowPlayingView