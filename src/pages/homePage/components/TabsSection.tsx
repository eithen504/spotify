import React, { useState } from 'react'
import { HOMEPAGE_TABS } from '../../../constants'
import { useScrollStore } from '../../../store/useScrollStore'

interface TabSectionProps {
    background: string
}

const TabsSection: React.FC<TabSectionProps> = ({ background }) => {
    const [activeTab, setActiveTab] = useState("All");
    const { scrollFromTop } = useScrollStore();

    return (
        <div className="fixed md:sticky top-0 left-0 w-full z-50 px-4 md:px-10 py-4 max-w-[90rem] mx-auto">
            {/* Background layer with scroll-dependent opacity */}
            <div
                className="absolute inset-0"
                style={{
                    background,
                    opacity: scrollFromTop / 250,
                }}
            />

            {/* Tabs container - always fully opaque */}
            <div className="relative flex items-center space-x-3">
                <div className="cursor-pointer flex-shrink-0 block md:hidden">
                    <img
                        src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                        alt="Liked Songs"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>

                {HOMEPAGE_TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`${activeTab === tab
                                ? "text-black bg-white"
                                : "text-[#ffffff] bg-white/15 hover:bg-white/25"
                            } cursor-pointer backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default TabsSection