import { useState, useRef } from "react";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import SearchSection from "./SearchSection";
import SortSection from "./SortSection";

const SearchSortSection = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchBarRef = useRef<HTMLDivElement>(null);


    const handleSearchIconClick = () => setIsSearchActive(true);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleClearSearchQuery = () => setSearchQuery("");

    return (
        <>
            {
                leftPanelSize >= 22 && (
                    <div className="flex items-center justify-between mb-3 px-5 relative">
                        {/* Search Section */}
                        <div className="flex items-center" ref={searchBarRef}>
                            <SearchSection
                                isSearchActive={isSearchActive}
                                searchQuery={searchQuery}
                                handleSearchIconClick={handleSearchIconClick}
                                handleInputChange={handleInputChange}
                                handleClearSearchQuery={handleClearSearchQuery}
                            />
                        </div>

                        {/* Sort Section */}
                        <SortSection isSearchActive={isSearchActive} />
                    </div>
                )
            }
        </>
    );
};

export default SearchSortSection;
