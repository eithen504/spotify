import React, { useState, useEffect } from "react";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import SearchSection from "./SearchSection";
import SortViewSection from "./SortViewSection";
import { useLibrarySearchStore } from "../../../../../store/useLibrarySearchStore";

interface LibraryToolbarProps {
    sidebarRef: React.RefObject<HTMLDivElement | null>;
}

const LibraryToolbar: React.FC<LibraryToolbarProps> = ({ sidebarRef }) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { setSearchQuery } = useLibrarySearchStore();

    const handleSearchIconClick = () => setIsSearchActive(!isSearchActive);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleClearSearchQuery = () => setSearchQuery("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsSearchActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {
                leftPanelSize >= 22 && (
                    <div className="flex items-center justify-between mb-3 px-5 relative">
                        {/* Search Section */}
                        <div className="flex items-center">
                            <SearchSection
                                isSearchActive={isSearchActive}
                                handleSearchIconClick={handleSearchIconClick}
                                handleInputChange={handleInputChange}
                                handleClearSearchQuery={handleClearSearchQuery}
                            />
                        </div>

                        {/* Sort Section */}
                        <SortViewSection isSearchActive={isSearchActive} />
                    </div>
                )
            }
        </>
    );
};

export default LibraryToolbar;
