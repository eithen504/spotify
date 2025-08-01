import React, { useEffect, useRef, useState } from 'react'
import TabsSection from './TabsSection'
import Header from './Header'
import SearchSortSection from './SearchSortSection'
import LibraryItems from './LibraryItems'

interface LeftSidebarProps {
    leftPanelSize: number
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ leftPanelSize }) => {
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
            className="bg-[#121212] text-white rounded-md flex flex-col h-full overflow-y-auto hide-scrollbar group"
            style={{ width: `${leftPanelSize}%` }}
            ref={sidebarRef}
        >
            <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} sticky top-0 bg-[#121212] z-50`}>
                {/* Header */}
                <Header />

                {/* Tabs Section */}
                <TabsSection />

                {/* Search + Sort */}
                <SearchSortSection />
            </div>

            {/* Library Items */}
            <LibraryItems />
        </aside>
    )
}

export default LeftSidebar