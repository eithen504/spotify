import type React from "react"
import { HOMEPAGE_TABS } from "../../../Constants";
import { useState } from "react";

interface TabsSectionProps {
    isScrolled: boolean;
}

const TabsSection: React.FC<TabsSectionProps> = ({ isScrolled }) => {
    const [activeTab, setActiveTab] = useState("All")

    return (
        <div className={`${isScrolled ? "bg-[#2D2453]" : ""} fixed md:sticky top-0 left-0 w-full z-50 px-4 md:px-10 py-4 max-w-[90rem] mx-auto`}>
            <div className="relative flex space-x-3">
                {HOMEPAGE_TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`${activeTab === tab
                            ? "text-black bg-white"
                            : "text-white bg-white/15 hover:bg-white/25"
                            } cursor-pointer backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium transition-colors`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TabsSection