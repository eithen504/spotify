import React, { useEffect, useRef, useState } from 'react'
import { BrowseIcon, BrowserFilledIcon, CrossIcon, MicIcon, SearchIcon } from '../../../../Svgs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RecentSearchesDropdown from './RecentSearchesDropdown';
import ListeningDialog from './ListeningDialog';
import type { AlphabetLetter, SearchItem } from '../../../../types';
import { SEARCH_DICTIONARY } from '../../../../data';
import { FUSION_SEARCH_HISTORY_KEY } from '../../../../constants';
import { isValidSearchItem } from '../../../../validators';
import { useCheckAuth } from '../../../../hooks/auth';

const SearchBar = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearchItems, setRecentSearchItems] = useState<SearchItem[]>([]);
    const [searchSuggestionItems, setSearchSuggestionItems] = useState<SearchItem[]>([]);
    const [isRecentSearchesDropdownOpen, setIsRecentSearchesDropdownOpen] = useState(false);
    const [isListeningDialogOpen, setIsListeningDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* ---------- Derived Values ---------- */
    const isSearchPage = pathname == "/search";

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "k") {
                event.preventDefault(); // prevent browser’s default find action
                console.log("Ctrl + K pressed!");
                // 👉 Example: focus search input
                inputRef.current?.focus();
                navigate("/search")
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <div className="max-w-[470px] w-full relative" ref={searchBarRef}>
                <div
                    className={`flex items-center bg-[#1f1f1f] rounded-full px-4 py-[11px] cursor-text ${isRecentSearchesDropdownOpen ? "border border-[#ffffff]" : "border border-transparent"}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <button
                        className={`mr-3 text-[#adadad] ${searchQuery.trim() ? "dynamic-text-hover cursor-pointer" : ""}`}
                    >
                        <SearchIcon />
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onFocus={() => setIsRecentSearchesDropdownOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate(`/search/${searchQuery}`)
                            }
                        }}
                        placeholder="What do you want to play?"
                        className="bg-transparent focus:outline-none flex-grow text-md placeholder:text-[#adadad] text-[#ffffff]"
                    />

                    {
                        searchQuery.trim() ? (
                            <button
                                className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                                onClick={handleClearSearchQuery}
                            >
                                <CrossIcon />
                            </button>
                        ) : (
                            <button
                                className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRecentSearchesDropdownOpen(false);
                                    setIsListeningDialogOpen(true);
                                }}
                            >
                                <MicIcon />
                            </button>
                        )
                    }

                    <div className="w-px h-6 bg-[#7C7C7C] mx-4"></div>

                    <Link
                        to={"/search"}
                        className={`flex flex-col ${isSearchPage ? "text-[#ffffff]" : "text-[#adadad]"} dynamic-text-hover gap-1 cursor-pointer`}
                        onClick={(e) => e.stopPropagation()}
                        title="Browse"
                    >
                        {
                            isSearchPage ? <BrowserFilledIcon /> : <BrowseIcon />
                        }
                    </Link>
                </div>

                {(isRecentSearchesDropdownOpen && currentUser) && (
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

            {
                (isListeningDialogOpen && currentUser) && (
                    <ListeningDialog
                        inputRef={inputRef}
                        setSearchQuery={setSearchQuery}
                        onClose={() => setIsListeningDialogOpen(false)}
                    />
                )
            }
        </>
    )
}

export default SearchBar