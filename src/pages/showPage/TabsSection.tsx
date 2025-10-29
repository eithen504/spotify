import { SHOW_PAGE_TABS } from "../../constants";
import type { ShowPageTab } from "../../types";


interface TabsSectionProps {
    activeTab: ShowPageTab;
    onTabChange: (tab: ShowPageTab) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-full px-4 md:px-6 mt-5">
            <div className="flex gap-6">
                {SHOW_PAGE_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`pb-3 text-sm font-medium transition-colors duration-200  cursor-pointer
                            ${activeTab === tab ? "text-white border-b-2 border-white" : "text-gray-400 dynamic-text-hover"}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabsSection;
