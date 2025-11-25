import React, { useEffect, useRef, useState } from 'react'
import TabsSection from './TabsSection'
import Header from './Header'
import LibraryItems from './LibraryItems'
import LibraryToolbar from './LibraryToolbar'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore'

interface LeftSidebarProps {
    leftPanelSize: number
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ leftPanelSize }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const { openedFolder } = useUIPreferencesStore();
    const { id: openedFolderId } = openedFolder;

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
            className="bg-[#121212] text-[#ffffff] rounded-md flex flex-col h-full overflow-y-auto hide-scrollbar group/header"
            style={{ width: `${leftPanelSize}%` }}
            ref={sidebarRef}
        >
            <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} sticky top-0 bg-[#121212] z-110`}>
                {/* Header */}
                <Header />

                {/* Tabs Section */}
                {
                    !openedFolderId && <TabsSection />
                }

                {/* Library Toolbar :- Search Section + Sort & View Section */}
                <LibraryToolbar sidebarRef={sidebarRef} />
            </div>

            {/* Library Items */}
            <LibraryItems />
        </aside>
    )
}

export default LeftSidebar