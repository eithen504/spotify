import React, { useEffect, useRef, useState } from 'react'
import { BrowseIcon, BrowserFilledIcon, CrossIcon, MicIcon, SearchIcon } from '../../../../Svgs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RecentSearchesDropdown from './RecentSearchesDropdown';
import ListeningDialog from './ListeningDialog';
import type { AlphabetLetter, SearchItem, SearchItemType } from '../../../../types';
import { SEARCH_DICTIONARY, SEARCH_ITEM_ID_MAP } from '../../../../data';

const SearchBar = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchQuery, setSearchQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);
    const [searchSuggestions, setSearchSuggestions] = useState<SearchItem[]>([]);
    const [isRecentSearchesDropdownOpen, setIsRecentSearchesDropdownOpen] = useState(false);
    const [isListeningDialogOpen, setIsListeningDialogOpen] = useState(false);

    /* ---------- Local References ---------- */
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* ---------- Derived Value ---------- */
    const isSearchPage = pathname == '/search';

    /* ---------- Methods Or Functions ---------- */
    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

    const handleClearSearchQuery = () => setSearchQuery("");

    const addItemToRecentSearches = (navigateUrl: string, id: string) => {
        let itemsIds: string[] = JSON.parse(localStorage.getItem("recentSearches") || "[]");

        // Remove existing instance of the id
        itemsIds = itemsIds.filter((i) => i !== id);

        // Add the new id at the beginning
        itemsIds.unshift(id);

        // If more than 10 items, remove the last one
        if (itemsIds.length > 10) {
            itemsIds.pop();
        }

        // Save back to localStorage
        localStorage.setItem("recentSearches", JSON.stringify(itemsIds));

        navigate(navigateUrl);
        setIsRecentSearchesDropdownOpen(false);
    };

    const removeItemFromRecentSearches = (id: string) => {
        let itemsIds: string[] = JSON.parse(localStorage.getItem("recentSearches") || "[]");

        const newRecentSearches = recentSearches.filter((item) => item._id != id.split('-')[0]);
        setRecentSearches(newRecentSearches);

        itemsIds = itemsIds.filter((i) => i != id);
        localStorage.setItem("recentSearches", JSON.stringify(itemsIds));
    }

    const clearRecentSearchHistory = () => {
        setRecentSearches([]);
        localStorage.setItem("recentSearches", JSON.stringify([]));
    }

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        let itemsIds: string[] = JSON.parse(localStorage.getItem("recentSearches") || "[]");

        const items = itemsIds.map((extandedId) => {
            const [id, type] = extandedId.split('-');

            if (type == "search") {
                return {
                    type: "Search" as SearchItemType,
                    _id: id,
                    title: id,
                }
            }

            const item = SEARCH_ITEM_ID_MAP[id];
            return item;
        })

        setRecentSearches(items);
    }, [])

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchSuggestions([]);
            return;
        }

        const firstLetter = searchQuery[0].toUpperCase();
        const suggestions = SEARCH_DICTIONARY[firstLetter.toUpperCase() as AlphabetLetter] || [];

        // filter items where the title includes the query (case-insensitive)
        const filtered = suggestions.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchSuggestions(filtered);
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
                                const navigateUrl = `/search/${searchQuery}`;
                                const id = `${searchQuery}-search`;
                                addItemToRecentSearches(navigateUrl, id);
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

                {isRecentSearchesDropdownOpen && (
                    <RecentSearchesDropdown
                        searchQuery={searchQuery}
                        recentSearches={recentSearches}
                        searchSuggestions={searchSuggestions}
                        addItemToRecentSearches={addItemToRecentSearches}
                        removeItemFromRecentSearches={removeItemFromRecentSearches}
                        clearRecentSearchHistory={clearRecentSearchHistory}
                    />
                )}
            </div>

            {
                isListeningDialogOpen && (
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