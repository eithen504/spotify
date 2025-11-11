import React, { useState, useEffect } from "react";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import SearchSection from "./SearchSection";
import SortViewSection from "./SortViewSection";
import { useLibrarySearchStore } from "../../../../../store/useLibrarySearchStore";

interface LibraryToolbarProps {
    sidebarRef: React.RefObject<HTMLDivElement | null>;
}

const LibraryToolbar: React.FC<LibraryToolbarProps> = ({ sidebarRef }) => {
    /* ---------- Local States ---------- */
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);

    /* ---------- Stores ---------- */
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar: { panelSize: leftPanelSize } } = preferences;
    const { setSearchQuery } = useLibrarySearchStore();

    /* ---------- Methods Or Functions ---------- */
    const handleSearchIconClick = () => setIsSearchBarActive(!isSearchBarActive);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleClearSearchQuery = () => setSearchQuery("");

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsSearchBarActive(false);
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
                                isSearchBarActive={isSearchBarActive}
                                handleSearchIconClick={handleSearchIconClick}
                                handleInputChange={handleInputChange}
                                handleClearSearchQuery={handleClearSearchQuery}
                            />
                        </div>

                        {/* Sort Section */}
                        <SortViewSection isSearchBarActive={isSearchBarActive} />
                    </div>
                )
            }
        </>
    );
};

export default LibraryToolbar;
