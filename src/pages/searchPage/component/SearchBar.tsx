import { useEffect, useRef, useState } from 'react';
import { CrossIcon, MicIcon, SearchIcon } from '../../../Svgs';
import RecentSearchesDropdown from '../../../layouts/desktopLayout/components/header/RecentSearchesDropdown';
import ListeningDialog from '../../../layouts/desktopLayout/components/header/ListeningDialog';
import { useNavigate } from 'react-router-dom';
import type { AlphabetLetter, SearchItem } from '../../../types';
import { SEARCH_DICTIONARY } from '../../../data';
import { FUSION_SEARCH_HISTORY_KEY } from '../../../constants';
import { isValidSearchItem } from '../../../validators';
import { useCheckAuth } from '../../../hooks/auth';

const SearchBar = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();

    /* ---------- Local States ---------- */
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearchItems, setRecentSearchItems] = useState<SearchItem[]>([]);
    const [searchSuggestionItems, setSearchSuggestionItems] = useState<SearchItem[]>([]);
    const [isRecentSearchesDropdownOpen, setIsRecentSearchesDropdownOpen] = useState(false);
    const [isListeningDialogOpen, setIsListeningDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();

    /* ---------- Methods Or Functions ---------- */
    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

    const handleClearSearchQuery = () => setSearchQuery("");

    const addItemToRecentSearches = (searchItem: SearchItem, navigateUrl: string) => {
        let filteredRecentSearchItems = recentSearchItems.filter((item) => searchItem._id != item._id);
        filteredRecentSearchItems = [searchItem, ...filteredRecentSearchItems];

        // make sure items length should not be greater than 8
        if (filteredRecentSearchItems.length > 8) {
            filteredRecentSearchItems = filteredRecentSearchItems.slice(0, 8);
        }

        setRecentSearchItems(filteredRecentSearchItems);
        localStorage.setItem(FUSION_SEARCH_HISTORY_KEY, JSON.stringify(filteredRecentSearchItems));
        setIsRecentSearchesDropdownOpen(false);
        navigate(navigateUrl);
    };

    const removeItemFromRecentSearches = (id: string) => {
        let filteredRecentSearchItems = recentSearchItems.filter((item) => id != item._id);
        setRecentSearchItems(filteredRecentSearchItems);
        localStorage.setItem(FUSION_SEARCH_HISTORY_KEY, JSON.stringify(filteredRecentSearchItems));
    }

    const clearRecentSearchHistory = () => {
        setRecentSearchItems([]);
        localStorage.setItem(FUSION_SEARCH_HISTORY_KEY, JSON.stringify([]));
    }

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        let raw = localStorage.getItem(FUSION_SEARCH_HISTORY_KEY);

        try {
            const parsed = JSON.parse(raw || "[]");

            // ensure it's an array
            if (!Array.isArray(parsed)) {
                setRecentSearchItems([]);
                return;
            }

            // filter out invalid items
            const validItems = parsed.filter(isValidSearchItem);

            setRecentSearchItems(validItems);

        } catch (err) {
            // JSON was invalid
            console.error("Invalid localStorage data:", err);
            setRecentSearchItems([]);
        }
    }, []);


    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchSuggestionItems([]);
            return;
        }

        const firstLetter = searchQuery[0].toUpperCase();
        const suggestions = SEARCH_DICTIONARY[firstLetter.toUpperCase() as AlphabetLetter] || [];

        // filter items where the title includes the query (case-insensitive)
        const filtered = suggestions.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchSuggestionItems(filtered);
    }, [searchQuery]);

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsRecentSearchesDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`block md:hidden w-full p-4 md:p-6`}>
            <h2 className="text-2xl font-bold text-white mb-4">
                Search
            </h2>
            <div className="relative" ref={searchBarRef}>
                <div
                    className="flex items-center gap-2 bg-white text-black rounded-[4px] px-4 py-[9px] w-full max-w-4xl mx-auto cursor-text"
                    onClick={() => inputRef.current?.focus()}
                >
                    <SearchIcon />

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onFocus={() => {
                            if (!currentUser) return;
                            setIsRecentSearchesDropdownOpen(true)
                        }}
                        placeholder="What do you want to listen to?"
                        className="bg-transparent focus:outline-none w-full placeholder-black"
                    />

                    {
                        searchQuery.trim() ? (
                            <button
                                className="cursor-pointer"
                                onClick={handleClearSearchQuery}
                            >
                                <CrossIcon width="22" height="22" />
                            </button>
                        ) : (
                            <button className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!currentUser) return;

                                    setIsRecentSearchesDropdownOpen(false);
                                    setIsListeningDialogOpen(true);
                                }}
                            >
                                <MicIcon />
                            </button>
                        )
                    }
                </div>

                {/* Recent Searches Dropdown */}
                {isRecentSearchesDropdownOpen && (
                    <RecentSearchesDropdown
                        searchQuery={searchQuery}
                        recentSearchItems={recentSearchItems}
                        searchSuggestionItems={searchSuggestionItems}
                        addItemToRecentSearches={addItemToRecentSearches}
                        removeItemFromRecentSearches={removeItemFromRecentSearches}
                        clearRecentSearchHistory={clearRecentSearchHistory}
                    />
                )}
            </div>

            {isListeningDialogOpen && (
                <ListeningDialog
                    inputRef={inputRef}
                    setSearchQuery={setSearchQuery}
                    onClose={() => setIsListeningDialogOpen(false)}
                />
            )}
        </div>
    )
}

export default SearchBar