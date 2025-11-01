import type React from "react"
import { CrossIcon, SearchIcon } from "../../../../Svgs"
import { useEffect, useState } from "react";
import type { AlphabetLetter, SearchItem, SearchItemType } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { SEARCH_DICTIONARY, SEARCH_ITEM_ID_MAP } from "../../../../data";
import { useBreakPoint } from "../../../../hooks/breakPoint";

interface RecentSearchesDropdownProps {
    searchQuery: string
    onClose: () => void;
}

const RecentSearchesDropdown: React.FC<RecentSearchesDropdownProps> = ({ searchQuery, onClose }) => {
    const navigate = useNavigate();
    const { breakPoint } = useBreakPoint();
    const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);
    const [searchSuggestions, setSearchSuggestions] = useState<SearchItem[]>([]);

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
        onClose();
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

    return (
        <div className={`absolute top-full p-2 z-800 mt-2 w-full ${breakPoint == "sm" ? "max-h-120" : "max-h-77"} overflow-y-auto custom-scrollbar bg-[#282828] text-[#ffffff] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-[#2a2a2a]`}>
            <div className="p-2 border-b border-[#2a2a2a] font-semibold text-md">
                Recent searches
            </div>

            {
                searchQuery.trim() ? (
                    <>
                        <div
                            className="group cursor-pointer dynamic-bg-hover text-[#ffffff] p-2 rounded-sm flex items-center relative"
                            style={{ '--bgHoverColor': '#404040' } as React.CSSProperties}
                            onClick={() => addItemToRecentSearches(`/search/${searchQuery}`, `${searchQuery}-search`)}
                        >
                            <button className="text-[#8f8f8f] dynamic-text-group-hover bg-[#282828] p-3 rounded-full">
                                <SearchIcon />
                            </button>

                            {/* Text Info */}
                            < div className="ml-3 flex flex-col overflow-hidden" >
                                <span className="text-md">{searchQuery}</span>
                            </div>
                        </div>

                        {
                            searchSuggestions.map((item: SearchItem) => {
                                const navigateUrl = item.type == "Album" ? `/album/${item._id}` : item.type == "Track" ? `/track/${item._id}` : item.type == "Search" ? `/search/${searchQuery}` : `/playlist/${item._id}`;
                                const id = `${item._id}-visit`;

                                return (
                                    <div
                                        key={item._id}
                                        className="group cursor-pointer dynamic-bg-hover text-[#ffffff] p-2 rounded-sm flex items-center relative"
                                        style={{ '--bgHoverColor': '#404040' } as React.CSSProperties}
                                        onClick={() => addItemToRecentSearches(navigateUrl, id)}
                                    >
                                        {/* coverImageUrl */}
                                        <div className="shrink-0 w-12 h-12">
                                            <img
                                                src={item.coverImageUrl}
                                                alt="Album Art"
                                                className="h-full w-full rounded-[4px] object-cover"
                                            />
                                        </div>

                                        {/* Text Info */}
                                        <div className="ml-3 flex flex-col overflow-hidden">
                                            <span className="text-md">{item.title}</span>
                                            <span className="text-sm text-gray-300 truncate mr-6">{`${item.type} . ${item.artist || "Spotify"}`}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    recentSearches.map((item: SearchItem) => {
                        if (!item) return null;

                        const navigateUrl = item.type == "Album" ? `/album/${item._id}` : item.type == "Track" ? `/track/${item._id}` : item.type == "Search" ? `/search/${item._id}` : `/playlist/${item._id}`;
                        const id = item.type == "Search" ? `${item._id}-search` : `${item._id}-visit`;

                        return (
                            <div
                                key={item._id}
                                className="group cursor-pointer dynamic-bg-hover text-[#ffffff] p-2 rounded-sm flex items-center relative"
                                style={{ '--bgHoverColor': '#404040' } as React.CSSProperties}
                                onClick={() => addItemToRecentSearches(navigateUrl, id)}
                            >
                                {/* CoverImageUrl */}
                                {
                                    item.coverImageUrl ? (
                                        <div className="shrink-0 w-12 h-12">
                                            <img
                                                src={item.coverImageUrl}
                                                alt="Album Art"
                                                className="h-full w-full rounded-[4px] object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <button className="text-[#8f8f8f] dynamic-text-group-hover bg-[#282828] p-3 rounded-full">
                                                <SearchIcon />
                                            </button>
                                        </>
                                    )
                                }

                                {/* Text Info */}
                                < div className="ml-3 flex flex-col overflow-hidden" >
                                    <span className="text-md">{item.title}</span>
                                    <span className="text-sm text-gray-300 truncate mr-6">{`${item.type} . ${item.artist || "Spotify"}`}</span>
                                </div>
                                
                                {/* Cross Icon */}
                                <button
                                    className="mr-1 absolute right-2 text-[#8f8f8f] dynamic-text-hover group-hover-opacity cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeItemFromRecentSearches(id);
                                    }}
                                >
                                    <CrossIcon width="15" height="15" />
                                </button>
                            </div >
                        )
                    })
                )
            }

            <div className="p-2">
                <button
                    className="py-1.5 px-6 text-sm border border-[#7c7c7c] dynamic-border-hover font-medium rounded-full cursor-pointer"
                    onClick={clearRecentSearchHistory}
                >
                    Clear recent searches
                </button>
            </div>
        </div >
    )
}

export default RecentSearchesDropdown