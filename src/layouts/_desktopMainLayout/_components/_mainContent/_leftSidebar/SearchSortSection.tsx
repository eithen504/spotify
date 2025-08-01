import { useState, useRef, useEffect } from "react";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import SearchSection from "./SearchSection";
import SortSection from "./SortSection";

const SearchSortSection = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const sortDropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchIconClick = () => setIsSearchActive(true);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleClearSearchQuery = () => setSearchQuery("");
    const toggleDropdown = () => setIsSortDropdownOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortDropdownRef.current &&
                !sortDropdownRef.current.contains(event.target as Node)
            ) {
                setIsSortDropdownOpen(false);
            }

            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target as Node)
            ) {
                setIsSearchActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                        <div className="relative" ref={sortDropdownRef}>
                            <SortSection isSearchActive={isSearchActive} isSortDropdownOpen={isSortDropdownOpen} toggleDropdown={toggleDropdown} />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SearchSortSection;
